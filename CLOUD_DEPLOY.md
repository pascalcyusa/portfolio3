# Cloud Deployment Guide

This guide explains how to deploy your portfolio to the cloud, utilizing a modern, scalable serverless architecture:
- **Database:** Serverless PostgreSQL via [Neon](https://neon.tech/)
- **Backend:** Dockerized FastAPI deployed to [Google Cloud Run](https://cloud.google.com/run)
- **Media Hosting:** [Google Cloud Storage](https://cloud.google.com/storage)
- **Frontend:** Next.js (via Bun) deployed to [Netlify](https://www.netlify.com/)

---

## 1. Set Up the Database (Neon)

1. Create an account on [Neon.tech](https://neon.tech/).
2. Create a new project and PostgreSQL database.
3. Obtain your database connection string (it will look something like `postgres://user:password@hostname.neon.tech/dbname`).
4. Keep this string handy. The FastAPI application uses SQLAlchemy, which requires `postgresql://` instead of `postgres://` (the backend code already handles this conversion automatically).

---

## 2. Set Up Media Storage (Google Cloud Storage)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Enable the **Cloud Storage API**.
4. Create a new Cloud Storage bucket (e.g., `my-portfolio-images`).
5. Choose your region and storage class.
6. Make the bucket publicly readable so visitors can see your images:
   - Go to the bucket's Permissions tab.
   - Click "Grant Access".
   - Add the principal `allUsers` and assign the role `Storage Object Viewer`.
7. **Service Account Key:**
   - Go to IAM & Admin > Service Accounts.
   - Create a new service account with the role `Storage Object Admin`.
   - Generate a JSON key for this service account and download it. You will need this for the backend to upload files.

---

## 3. Deploy the Backend (Google Cloud Run)

Cloud Run is perfect for a Dockerized FastAPI app because it scales to zero when not in use (saving money).

1. Install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) and authenticate:
   ```bash
   gcloud auth login
   ```
2. Set your active project:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```
3. Ensure the **Cloud Build API** and **Cloud Run API** are enabled in your GCP console.
4. Navigate to the `backend` directory in your terminal:
   ```bash
   cd backend
   ```
5. Deploy to Cloud Run:
   ```bash
   gcloud run deploy portfolio-backend \
     --source . \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars="DATABASE_URL=your_neon_db_url,GCS_BUCKET_NAME=your_gcs_bucket_name,ADMIN_API_KEY=your_secure_random_key"
   ```
   *Note:* Replace `your_neon_db_url` with your Neon connection string, `your_gcs_bucket_name` with your bucket name, and `your_secure_random_key` with a long, unguessable string.

6. **Wait for the deployment to finish.** Cloud Run will provide you with a public URL (e.g., `https://portfolio-backend-xyz.run.app`). Keep this URL handy.

### 3a. Securely providing the Service Account Key
If you need the FastAPI app to upload files to GCS, you must provide the service account JSON key to Cloud Run. The best way is to use Google Secret Manager. Alternatively, if your Cloud Run service is running in the *same GCP project* as your bucket, you can assign the `Storage Object Admin` role directly to the Cloud Run service's default compute service account, bypassing the need for a JSON key entirely! (This is the recommended approach).

---

## 4. Deploy the Frontend (Netlify)

Since you are using Netlify for your Next.js frontend, the deployment is straightforward.

1. Ensure your code is pushed to a GitHub/GitLab repository.
2. Log in to [Netlify](https://app.netlify.com/).
3. Click "Add new site" > "Import an existing project" and connect your repository.
4. **Build settings:**
   - **Base directory:** `.` (root)
   - **Build command:** `bun run build`
   - **Publish directory:** `.next`
5. **Environment Variables:**
   - Add a new environment variable named `NEXT_PUBLIC_API_URL` and set its value to your Cloud Run URL (e.g., `https://portfolio-backend-xyz.run.app/api`).
   - Add your Google Analytics ID: `NEXT_PUBLIC_GA_ID=your_ga_id`
6. Click **Deploy site**.

---

## 5. Migration: Seed your Production Database

Once both frontend and backend are live, your frontend will likely fallback to the local TypeScript data because the Neon database is empty. You need to migrate your data.

1. Go to your local terminal and ensure you have generated the seed files:
   ```bash
   bun run scripts/seed_generator.ts
   ```
2. Open `backend/seed.py` and temporarily change the `API_URL` at the top of the file to your live Cloud Run URL (e.g., `API_URL = "https://portfolio-backend-xyz.run.app/api"`).
3. Set your production admin key locally:
   ```bash
   export ADMIN_API_KEY=the_secure_random_key_you_set_in_cloud_run
   ```
4. Run the seed script:
   ```bash
   cd backend
   python seed.py
   ```
5. Your production Neon database is now populated!
6. **Important:** Your images in the database still point to local paths (e.g., `/images/...`). You must upload your `public/images` folder to your new Google Cloud Storage bucket, and then update the image URLs in your Neon database to point to the new GCS public URLs (e.g., `https://storage.googleapis.com/my-portfolio-images/...`). You can do this manually via the FastAPI Swagger UI (`https://your-cloud-run-url/api/docs`).

Congratulations! Your portfolio is now fully dynamic and scalable.

### Automating Media Migration

We have included a handy bash script to migrate your `public/images` folder to your new Google Cloud Storage bucket, and update your database seed files automatically!

```bash
# Provide the name of the bucket you created in Step 2
./scripts/migrate_media.sh my-portfolio-images
```
This will:
1. Upload all local images to GCS using `gsutil`.
2. Make the bucket contents publicly viewable.
3. Update your local `backend/seed_data/projects_seed.json` and `backend/seed_data/research_seed.json` so that they point to the new `https://storage.googleapis.com/my-portfolio-images/...` URLs instead of `/images/...`.

After running the script, simply run `python backend/seed.py` (making sure `API_URL` points to your Cloud Run URL) to seed the database with the updated media links.
