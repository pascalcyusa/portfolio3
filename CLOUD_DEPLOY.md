# Cloud Deployment Guide

This guide explains how your portfolio is deployed to the cloud, utilizing a modern, scalable serverless architecture.

## Architecture Overview

- **Database:** Serverless PostgreSQL via [Neon](https://neon.tech/)
- **Backend:** Dockerized FastAPI automatically deployed to [Google Cloud Run](https://cloud.google.com/run)
- **Media Hosting:** [Google Cloud Storage](https://cloud.google.com/storage)
- **Frontend:** Next.js automatically deployed to [Netlify](https://www.netlify.com/)
- **CI/CD:** Google Cloud Build

---

## 1. Zero-Downtime automated deployments

The application is configured to deploy automatically whenever you push code to GitHub.

### Deploying the Backend
Your backend is deployed sequentially using Google Cloud Build. 

1. Ensure your latest local commits are pushed to the **main branch** (or your designated deployment branch).
2. The `cloudbuild.yaml` in the repository root will automatically trigger on GCP.
3. **Important Security Note:** Google Cloud Build uses `--set-secrets` natively during deployment. It will securely pull the following secrets directly from **GCP Secret Manager** to pass to Cloud Run:
   - `DATABASE_URL`
   - `ADMIN_API_KEY`
   - `CLERK_SECRET_KEY`
   - `CLERK_PUBLISHABLE_KEY`
4. Make sure that any domain adjustments (like frontend URLs) are up to date in the `_BACKEND_CORS_ORIGINS` substitution in `cloudbuild.yaml`.

### Deploying the Frontend
Your frontend repository is linked seamlessly via Netlify.

1. Committing to GitHub immediately triggers a fast build and redeploy.
2. Ensure the following environment variables are maintained in the **Netlify Dashboard UI** (under Site configuration > Environment variables):
   - `NEXT_PUBLIC_API_URL` (Must point to your live Cloud Run URL)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`

---

## 2. Managing the Postgres Database (Neon)

Since your backend connects to a serverless Neon database, connection pooling drops are natively handled by the `backend/app/database.py` connection safeguards (pinging and recycling pools).
To update or access your database directly:
1. Log into your [Neon Dashboard](https://neon.tech).
2. Copy the `postgresql://` formatted database URL if you ever need to manually connect via a GUI (like DBeaver or TablePlus).
3. Update the `DATABASE_URL` value stored in your Google Cloud Secret Manager if this string ever rotates.

---

## 3. Media Storage (Google Cloud Storage)

Images are uploaded directly to Google Cloud Storage.
- For local testing, your backend leverages your Application Default Credentials.
- For production, your backend Cloud Run Service Account automatically handles `storage.objectAdmin` duties. 
- You manually manage the static contents within `public/images` locally; however, your `cloudbuild.yaml` has an automated pipeline to sync any local files found in `public/images/` up to GCS when it pushes.
