# 🌍 Environment Configuration Guide

## 📁 Environment Files

### Frontend Files
- `.env.development` - Local development configuration
- `.env.local` - Your current active configuration (symlinked)
*(Note: Production frontend variables are managed directly in the Netlify Dashboard UI)*

### Backend Files
- `backend/.env.development` - Local backend configuration
- `backend/.env` - Your current active backend configuration (symlinked)
*(Note: Production backend secrets are managed securely via GCP Secret Manager)*

## 🔧 Workflow: Development vs Production

### For Development (Local Testing)
1. Ensure your local files are pointing to development:
```bash
cd /Users/pascal/Downloads/portfolio3

# Reset configurations
rm -f .env.local backend/.env

# Symlink development configs
ln -s .env.development .env.local
ln -s backend/.env.development backend/.env
```

2. Start your services locally:
```bash
# Terminal 1: Backend
cd backend
uvicorn main:app --reload

# Terminal 2: Frontend  
cd ..
bun run dev
```
*Your application is now running completely locally, using an SQLite db `test.db` and Test Mode Clerk Auth.*

### For Hybrid Testing (Local Frontend + Production Backend)
If you want to run your local code but test it against the real production database and Cloud Run backend:
1. Open `.env.local` (which is a symlink to `.env.development`).
2. Change `NEXT_PUBLIC_API_URL` to point to the remote backend:
`NEXT_PUBLIC_API_URL=https://portfolio-backend-ngpmx27epq-uk.a.run.app/api`
3. Restart `bun run dev`.

### For Production (Google Cloud Build + Netlify)
You **do not need any `.env.production` files anymore.** The deployment pipeline skips them entirely for greater security.

**To deploy the Backend:**
1. Simply push your code to GitHub.
2. Google Cloud Build (`cloudbuild.yaml`) automatically runs.
3. The Cloud Build runner fetches production secrets (`DATABASE_URL`, `ADMIN_API_KEY`, `CLERK` keys) directly from Google Secret Manager.

**To deploy the Frontend:**
1. Simply push your code to GitHub.
2. Netlify handles the build.
3. All environment variables (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`) are managed directly in the Netlify Dashboard (Site Configuration -> Environment Variables).

## 🚀 Quick Reference

| Setting | Development (Local) | Hybrid (Local+Prod) | Production (Live) |
|---------|---------------------|---------------------|-------------------|
| **API URL** | `localhost:8080/api` | `[Cloud Run URL]/api` | `[Cloud Run URL]/api` |
| **Database**| SQLite (`test.db`) | Live Postgres DB | Live Postgres DB |
| **Secrets** | `.env.development` | `.env.development` | GCP Secret Manager / Netlify |
| **Images**  | GCS (via Local Application Default Credentials) | GCS | GCS |

## 🔑 Security Notes
1. **Never commit `.env.local` or `.env` files.** 
2. We have strictly removed all `.env.production` files. Using GCP Secret Manager and Netlify UI ensures zero risk of mistakenly committing highly sensitive credentials like `DATABASE_URL` to your Git repository.