# CI/CD Setup with GitHub Actions

This guide explains how to set up continuous integration and deployment (CI/CD) using GitHub Actions. Every time you push code to your repository's `main` branch, GitHub will automatically:
1. Sync any updated images from your repository to your Google Cloud Storage (GCS) bucket.
2. Build a new Docker container and deploy your updated FastAPI backend to Google Cloud Run.

To do this securely (without storing long-lived JSON keys in GitHub), we will use **Workload Identity Federation (WIF)**.

---

## Step 1: Set Up Workload Identity Federation in Google Cloud

Run these commands in your local terminal (ensure you are authenticated with `gcloud auth login`).

### 1. Enable Required APIs
```bash
gcloud services enable iamcredentials.googleapis.com \
    cloudresourcemanager.googleapis.com \
    run.googleapis.com \
    artifactregistry.googleapis.com
```

### 2. Create a Dedicated Service Account for GitHub Actions
We will create a service account specifically for GitHub to use when deploying.
```bash
gcloud iam service-accounts create github-actions-sa \
    --display-name="GitHub Actions Deployment Account"
```

### 3. Grant Permissions to the Service Account
Your project number can be found by running: 
`gcloud projects describe $(gcloud config get-value project) --format="value(projectNumber)"`

Replace `[YOUR_PROJECT_ID]` with your actual project ID, and `[YOUR_BUCKET_NAME]` with your GCS bucket name.

```bash
# Allow it to deploy to Cloud Run
gcloud projects add-iam-policy-binding [YOUR_PROJECT_ID] \
    --member="serviceAccount:github-actions-sa@[YOUR_PROJECT_ID].iam.gserviceaccount.com" \
    --role="roles/run.admin"

# Allow it to act as the Cloud Run service identity
gcloud projects add-iam-policy-binding [YOUR_PROJECT_ID] \
    --member="serviceAccount:github-actions-sa@[YOUR_PROJECT_ID].iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

# Allow it to push built images to Artifact Registry
gcloud projects add-iam-policy-binding [YOUR_PROJECT_ID] \
    --member="serviceAccount:github-actions-sa@[YOUR_PROJECT_ID].iam.gserviceaccount.com" \
    --role="roles/artifactregistry.writer"

# Allow it to sync files to your Storage Bucket
gcloud storage buckets add-iam-policy-binding gs://[YOUR_BUCKET_NAME] \
    --member="serviceAccount:github-actions-sa@[YOUR_PROJECT_ID].iam.gserviceaccount.com" \
    --role="roles/storage.objectAdmin"
```

### 4. Create the Workload Identity Pool and Provider
```bash
# Create the Pool
gcloud iam workload-identity-pools create github-pool \
    --location="global" \
    --description="GitHub Actions Pool" \
    --display-name="GitHub Pool"

# Create the Provider inside the Pool (Replace [YOUR_GITHUB_ORG/YOUR_REPO_NAME])
gcloud iam workload-identity-pools providers create-oidc github-provider \
    --location="global" \
    --workload-identity-pool="github-pool" \
    --display-name="GitHub Provider" \
    --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-condition="assertion.repository == '[YOUR_GITHUB_ORG/YOUR_REPO_NAME]'"
```

### 5. Bind the Pool to your Service Account
Replace `[PROJECT_NUMBER]`, `[YOUR_PROJECT_ID]`, and `[YOUR_GITHUB_ORG/YOUR_REPO_NAME]`:
```bash
gcloud iam service-accounts add-iam-policy-binding github-actions-sa@[YOUR_PROJECT_ID].iam.gserviceaccount.com \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/projects/[PROJECT_NUMBER]/locations/global/workloadIdentityPools/github-pool/attribute.repository/[YOUR_GITHUB_ORG/YOUR_REPO_NAME]"
```

---

## Step 2: Set GitHub Repository Secrets

Go to your repository on GitHub -> **Settings** -> **Secrets and variables** -> **Actions**. 
Click **New repository secret** and add the following:

| Secret Name | Value Example | Description |
|---|---|---|
| `GCP_PROJECT_ID` | `my-portfolio-project-123` | Your Google Cloud Project ID |
| `GCP_REGION` | `us-east4` | Your Cloud Run region |
| `GCP_WIF_PROVIDER` | `projects/[PROJECT_NUMBER]/locations/global/workloadIdentityPools/github-pool/providers/github-provider` | The full path to the Workload Identity Provider created above |
| `GCP_SERVICE_ACCOUNT` | `github-actions-sa@[YOUR_PROJECT_ID].iam.gserviceaccount.com` | The email of the service account created in step 1 |
| `DATABASE_URL` | `postgresql://user:pass@host/dbname` | Your Neon production database URL |
| `GCS_BUCKET_NAME` | `my-portfolio-images` | Your Cloud Storage bucket name |
| `ADMIN_API_KEY` | `your_super_secret_key` | Your production API key for seed routes |

---

## Step 3: Create the GitHub Actions Workflow File

In your local repository, create a `.github/workflows` directory at the root (if it doesn't exist), and add a file named `deploy.yml`. 

Copy the following code into `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Google Cloud

on:
  push:
    branches:
      - main  # Set this to your default branch
    paths:
      - 'backend/**'   # Only trigger if backend or images change
      - 'public/images/**'

# Required to allow GitHub to request an OIDC token for WIF
permissions:
  contents: read
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Authenticate to Google Cloud
        id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.GCP_WIF_PROVIDER }}
          service_account: ${{ secrets.GCP_SERVICE_ACCOUNT }}

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v2

      # Optional: Sync Images to GCS Bucket
      # Adjust the path below ('public/images') if your images live somewhere else
      - name: Sync Images to Google Cloud Storage
        run: |
          if [ -d "public/images" ]; then
            gcloud storage cp -r public/images gs://${{ secrets.GCS_BUCKET_NAME }}/
          else
            echo "No public/images folder found to upload."
          fi

      - name: Deploy to Cloud Run
        # Note: Depending on your repo structure, if your Dockerfile is in a 'backend' folder,
        # adjust the `--source` parameter to point to it (e.g., `--source backend`)
        run: |
          gcloud run deploy portfolio-backend \
            --source backend \
            --region ${{ secrets.GCP_REGION }} \
            --allow-unauthenticated \
            --set-env-vars="DATABASE_URL=${{ secrets.DATABASE_URL }},GCS_BUCKET_NAME=${{ secrets.GCS_BUCKET_NAME }},ADMIN_API_KEY=${{ secrets.ADMIN_API_KEY }}"
```

## Step 4: Commit and Push
Once the `.github/workflows/deploy.yml` file is saved, commit your changes and push them to your `main` branch. 

Go to the **Actions** tab in your GitHub repository, and you will see your deployment running automatically!

---

# Alternative: Using Google Cloud Build Triggers

If you prefer to keep everything entirely within Google Cloud without configuring Workload Identity Federation in GitHub Actions, you can use **Cloud Build Triggers**.

Google Cloud Build natively monitors your GitHub repository and runs a `cloudbuild.yaml` script whenever you push to a specific branch. Because it runs natively inside your GCP project, authentication is completely seamless!

## Step 1: Connect your GitHub Repository
1. Go to the [Cloud Build Triggers Console](https://console.cloud.google.com/cloud-build/triggers).
2. Click **Connect Repository** and follow the prompts to authenticate with GitHub and select your portfolio repository.

## Step 2: Grant the Cloud Build Service Account Permissions
By default, Cloud Build doesn't have permission to deploy to Cloud Run or modify your Storage Bucket. Let's fix that.

Find your Project Number:
```bash
gcloud projects describe $(gcloud config get-value project) --format="value(projectNumber)"
```

Run these commands (replace `[PROJECT_NUMBER]` and `[YOUR_BUCKET_NAME]`):
```bash
# Allow Cloud Build to deploy to Cloud Run
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:[PROJECT_NUMBER]@cloudbuild.gserviceaccount.com" \
    --role="roles/run.admin"

# Allow Cloud Build to act as the Cloud Run service identity
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:[PROJECT_NUMBER]@cloudbuild.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

# Allow Cloud Build to write logs
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
    --member="serviceAccount:[PROJECT_NUMBER]@cloudbuild.gserviceaccount.com" \
    --role="roles/logging.logWriter"

# Allow Cloud Build to sync images to your GCS bucket
gcloud storage buckets add-iam-policy-binding gs://[YOUR_BUCKET_NAME] \
    --member="serviceAccount:[PROJECT_NUMBER]@cloudbuild.gserviceaccount.com" \
    --role="roles/storage.objectAdmin"
```

## Step 3: Create the `cloudbuild.yaml` file
At the root of your repository (or inside your backend folder depending on where you want the build to run), create a file named `cloudbuild.yaml` and paste the following:

```yaml
steps:
  # Step 1: Sync images to Google Cloud Storage
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: 'bash'
    args:
      - '-c'
      - |
        if [ -d "public/images" ]; then
          gcloud storage cp -r public/images/* gs://$_GCS_BUCKET_NAME/images/
        else
          echo "No public/images folder found to upload."
        fi

  # Step 2: Build and Deploy the backend to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: 'gcloud'
    secretEnv: ['DATABASE_URL', 'ADMIN_API_KEY']
    args:
      - 'run'
      - 'deploy'
      - 'portfolio-backend'
      - '--source'
      - 'backend'          # Change to '.' if cloudbuild.yaml is inside the backend folder
      - '--region'
      - '$_GCP_REGION'
      - '--allow-unauthenticated'
      - '--set-env-vars'
      - 'DATABASE_URL=$$DATABASE_URL,GCS_BUCKET_NAME=$_GCS_BUCKET_NAME,ADMIN_API_KEY=$$ADMIN_API_KEY'
      - '--no-user-output-enabled'

options:
  # Disable automatic vulnerability scanning for deployed containers to prevent unexpected charges
  # Cloud Build's "Container Analysis" can cost $0.26 per container scanned if not disabled
  requestedVerifyOption: 'NOT_VERIFIED'
  # Required when a custom service account runs the build
  logging: 'CLOUD_LOGGING_ONLY'
  
substitutions:
  _GCP_REGION: 'us-east4'
  _GCS_BUCKET_NAME: 'my-portfolio-images'

availableSecrets:
  secretManager:
    - versionName: projects/$PROJECT_ID/secrets/DATABASE_URL/versions/latest
      env: 'DATABASE_URL'
    - versionName: projects/$PROJECT_ID/secrets/ADMIN_API_KEY/versions/latest
      env: 'ADMIN_API_KEY'
```

### 3.2 Securely Storing Secrets in Secret Manager
Instead of storing sensitive keys like your database URL directly in `cloudbuild.yaml` (which anyone can see on GitHub), you must store them in Google Secret Manager.

**1. Enable the Secret Manager API:**
```bash
gcloud services enable secretmanager.googleapis.com
```

**2. Create the secrets:**
```bash
echo -n "postgresql://user:pass@host/dbname" | gcloud secrets create DATABASE_URL --data-file=-
echo -n "your_super_secret_key" | gcloud secrets create ADMIN_API_KEY --data-file=-
```

**3. Grant Cloud Build permission to read the secrets:**
Find your Project Number:
```bash
gcloud projects describe $(gcloud config get-value project) --format="value(projectNumber)"
```

Run these commands (replace `[PROJECT_NUMBER]`):
```bash
gcloud secrets add-iam-policy-binding DATABASE_URL \
    --member="serviceAccount:[PROJECT_NUMBER]@cloudbuild.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding ADMIN_API_KEY \
    --member="serviceAccount:[PROJECT_NUMBER]@cloudbuild.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"
```

## Step 4: Create the Trigger in Google Cloud Console
1. Go back to [Cloud Build Triggers Console](https://console.cloud.google.com/cloud-build/triggers).
2. Click **Create Trigger**.
3. Name it "deploy-portfolio-backend".
4. Set the **Event** to **Push to a branch**.
5. Select your connected GitHub repository. 
6. Under **Branch**, type `^your-branch-name$` (for example, if your branch is `feat/fastapi`, type `^feat/fastapi$`). *The `^` and `$` symbols are regex characters ensuring exact matches.*
7. Under **Configuration**, choose **Cloud Build configuration file (yaml or json)**.
8. Click **Create**.

Now, every time you push to that specific branch, Cloud Build will automatically run the steps defined in your `cloudbuild.yaml`!