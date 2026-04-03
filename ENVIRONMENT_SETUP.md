# 🌍 Environment Configuration Guide

## 📁 Environment Files

### Frontend Files
- `.env.development` - Local development configuration
- `.env.production` - Production deployment configuration
- `.env.local` - Your current active configuration (symlinked)

### Backend Files
- `backend/.env.development` - Local backend configuration
- `backend/.env.production` - Production backend configuration
- `backend/.env` - Your current active backend configuration (symlinked)

## 🔧 How to Switch Between Environments

### For Development (Local Testing)

```bash
# Set up development environment
cd /Users/pascal/Downloads/portfolio3

# Remove existing .env files
rm -f .env.local backend/.env

# Create symlinks to development configs
ln -s .env.development .env.local
ln -s backend/.env.development backend/.env

# Start services
# Terminal 1: Backend
cd backend
uvicorn main:app --reload

# Terminal 2: Frontend  
cd ..
bun run dev
```

### For Production (Google Cloud Deployment)

```bash
# Set up production environment
cd /Users/pascal/Downloads/portfolio3

# Remove existing .env files
rm -f .env.local backend/.env

# Create symlinks to production configs
ln -s .env.production .env.local
ln -s backend/.env.production backend/.env

# Edit production files with your actual credentials
nano .env.production
nano backend/.env.production

# Build and start for production
bun run build
bun run start
```

## 📝 What You Need to Replace in Production Files

### Frontend (.env.production)
- `NEXT_PUBLIC_API_URL` - Your Google Cloud backend URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Get from Clerk dashboard
- `CLERK_SECRET_KEY` - Get from Clerk dashboard
- `NEXT_PUBLIC_GA_ID` - Your Google Analytics ID

### Backend (backend/.env.production)
- `DATABASE_URL` - Your Cloud SQL connection string
- `ADMIN_API_KEY` - Generate a secure key
- `CLERK_SECRET_KEY` - Same as frontend
- `GOOGLE_APPLICATION_CREDENTIALS` - Path to service account JSON
- `ALLOWED_ORIGINS` - Your production domain(s)

## 🚀 Quick Reference

| Setting | Development | Production |
|---------|------------|------------|
| **API URL** | `localhost:8080` | `your-gcp-url.uc.r.appspot.com` |
| **Database** | SQLite (`test.db`) | Cloud SQL PostgreSQL |
| **Clerk Keys** | Test keys | Production keys |
| **Images** | Local fallback | GCS bucket |
| **Debug** | `True` | `False` |

## 🔑 Security Notes

1. **Never commit `.env.local` or `.env` files** - They contain secrets
2. **Use `.gitignore`** - These files should be ignored
3. **Production keys** - Get from Clerk dashboard and Google Cloud console
4. **Database credentials** - Use strong passwords for production

## 🎯 Testing Workflow

1. **Develop locally** with `.env.development`
2. **Test thoroughly** before switching to production
3. **Deploy to staging** first if possible
4. **Monitor production** after deployment

## 📋 Check Current Configuration

```bash
# Check frontend config
echo "Frontend API: $(grep NEXT_PUBLIC_API_URL .env.local)"
echo "Environment: $(grep ENVIRONMENT .env.local || echo "development")"

# Check backend config
echo "Backend DB: $(grep DATABASE_URL backend/.env)"
echo "Backend Env: $(grep ENVIRONMENT backend/.env)"
```

## 🔄 Switching Back to Development

```bash
# Quick switch back to development
rm .env.local backend/.env
ln -s .env.development .env.local
ln -s backend/.env.development backend/.env

# Restart services
pkill -f uvicorn
pkill -f bun
cd backend && uvicorn main:app --reload &
cd .. && bun run dev
```