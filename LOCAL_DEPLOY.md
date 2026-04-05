# Local Deployment Guide

This guide explains how to run the full portfolio stack locally. 

## Prerequisites
- [Bun](https://bun.sh/) installed (for Frontend).
- [Python 3.11+](https://www.python.org/) installed (for Backend).
- (Optional) [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) if you want to upload artifacts to Google Cloud Storage.

## Step 1: Start the Backend

The backend handles API requests, database interactions, and Google Cloud Storage uploads. We will run it natively using Python.

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Link the development environment:
   ```bash
   ln -f -s .env.development .env
   ```
   *(This ensures you connect to the local SQLite database `test.db` instead of the production Postgres DB).*

3. Set up your Python environment and start the server:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8080
   ```
   *The backend is now running at `http://localhost:8080`. You can view the interactive Swagger UI at `http://localhost:8080/docs`.*

## Step 2: Start the Frontend

The Next.js frontend fetches data from the FastAPI backend.

1. Navigate back to the root directory.
2. Install dependencies using Bun:
   ```bash
   bun install
   ```
3. Use the provided frontend development environment:
   ```bash
   ln -f -s .env.development .env.local
   ```
4. Start the development server:
   ```bash
   bun run dev
   ```
   *The frontend is now running at `http://localhost:3000`.*

---

## Troubleshooting
- **Frontend not showing data:** Make sure your backend is running on port `8080`. If you just started fresh, you can create a test project via the `/admin` portal (once signed in) to initialize data in your SQLite DB.
- **Cannot upload images:** Image uploading directly integrates with GCS. It requires you to have Google Application Default Credentials authenticated on your machine (`gcloud auth application-default login`). If you skip this, image uploads locally will fail but viewing text data still works perfectly.
