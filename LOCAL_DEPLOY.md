# Local Deployment Guide

This guide explains how to run the full portfolio stack locally. The stack consists of a Dockerized FastAPI backend (connected to a local SQLite database for development) and a Next.js frontend running via Bun.

## Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose installed.
- [Bun](https://bun.sh/) installed.
- (Optional) [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) if you want to test Google Cloud Storage uploads locally.

## Step 1: Start the Backend (Docker)

The backend handles API requests, database interactions, and Google Cloud Storage uploads. We will run it using Docker Compose.

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file for local development:
   ```bash
   cat << 'ENV' > .env
   DATABASE_URL=sqlite:///./test.db
   GCS_BUCKET_NAME=your-local-test-bucket
   # Required for local testing of uploads, otherwise leave blank or dummy
   # GOOGLE_APPLICATION_CREDENTIALS=/app/gcp-key.json
   ADMIN_API_KEY=my_secret_dev_key
   ENV
   ```

3. Build and start the backend container:
   ```bash
   docker compose up --build -d
   ```
   *The backend is now running at `http://localhost:8080`. You can view the interactive Swagger UI at `http://localhost:8080/api/docs`.*

## Step 2: Seed the Database (Optional)

If you want to populate your local database with your existing portfolio data (Projects and Research):

1. From the root directory, generate the seed files:
   ```bash
   bun run scripts/seed_generator.js
   ```
2. Navigate to the backend and run the seed script:
   ```bash
   cd backend
   # You must have Python installed locally to run this script easily, or run it inside the docker container
   python3 -m venv venv
   source venv/bin/activate
   pip install requests
   export ADMIN_API_KEY=my_secret_dev_key
   python seed.py
   ```

## Step 3: Start the Frontend (Bun)

The Next.js frontend fetches data from the FastAPI backend.

1. Navigate back to the root directory (if you aren't already there).
2. Install dependencies using Bun:
   ```bash
   bun install
   ```
3. Set the backend API URL. Create a `.env.local` file in the root directory:
   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local
   ```
4. Start the development server:
   ```bash
   bun run dev
   ```
   *The frontend is now running at `http://localhost:3000`.*

---

## Troubleshooting
- **Backend fails to start:** Check Docker logs with `docker compose logs web`.
- **Frontend not showing data:** Make sure your backend is running on port 8080 and that you seeded the database. If the database is empty or down, the frontend will automatically fall back to the hardcoded local TypeScript files (`src/data/projects.ts` and `src/data/research.ts`).
- **Cannot upload images:** Image uploading requires a valid Google Cloud Storage bucket and credentials. If you are just testing UI features locally, you can skip image uploading or mock it.
