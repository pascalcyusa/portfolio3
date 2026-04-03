# AI Agent Instructions for Portfolio3

## ⚠️ CRITICAL: BUN PACKAGE MANAGER REQUIRED

**THIS PROJECT USES BUN, NOT NPM!**

Before doing ANYTHING with the frontend:
1. Install bun: `curl -fsSL https://bun.sh/install | bash`
2. Use `bun install`, `bun add`, `bun run` commands
3. NEVER use npm, yarn, or pnpm

## Package Managers

### Frontend (Next.js)
- **Package Manager**: `bun` (used instead of npm)
- **Commands**:
  - `bun install` - Install dependencies
  - `bun add <package>` - Add new packages
  - `bun run dev` - Start development server
  - `bun run build` - Build for production
  - `bun run start` - Start production server

### Backend (FastAPI)
- **Package Manager**: `pip` (Python)
- **Commands**:
  - `pip install -r requirements.txt` - Install Python dependencies
  - `uvicorn main:app --reload` - Start development server

## CRITICAL: Package Manager Enforcement

⚠️ **IMPORTANT**: This project uses `bun` as the primary package manager for frontend operations.

- **DO NOT use npm, yarn, or pnpm** - These will cause dependency conflicts
- **Always use `bun`** for all frontend package operations
- The project is configured with bun.lockb (not package-lock.json or yarn.lock)
- Bun is significantly faster and handles dependencies more reliably for this project

## How to Ensure Bun Usage

1. **Install bun globally** if not already installed:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Verify bun is being used**:
   ```bash
   bun --version
   ```

3. **Never run npm/yarn commands** in the frontend directory

## Important Notes

1. **Always use `bun` for frontend operations**, not npm or yarn
2. The frontend is configured to use bun for faster performance
3. Backend uses standard Python pip for dependency management
4. When adding frontend dependencies, use `bun add <package-name>`
5. If you accidentally use npm, delete package-lock.json and run `bun install`

## Development Workflow

1. Frontend: `bun run dev` (port 3000)
2. Backend: `uvicorn main:app --reload` (port 8000)
3. Database: SQLite (configured in backend/.env)

## Environment Variables

- Frontend: `.env.local`
- Backend: `backend/.env`

## Build System

- Frontend uses Next.js with bun
- Backend uses FastAPI with Uvicorn
- Database migrations handled via SQLAlchemy

## Troubleshooting

**If you accidentally used npm/yarn:**
1. Delete `package-lock.json` or `yarn.lock`
2. Run `bun install` to regenerate `bun.lockb`
3. Verify dependencies with `bun list`
