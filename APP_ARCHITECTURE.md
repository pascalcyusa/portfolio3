# Application Architecture

This document describes the modern, decoupled, serverless architecture used by this portfolio website. By separating the frontend, backend, database, and media storage, the application achieves high scalability, low repository size, and fast global loading times.

## Overview

The system is composed of four main pillars:
1. **Frontend:** Next.js (React) with bun package manager
2. **Backend API:** FastAPI (Python) with flexible database support
3. **Database:** SQLite (local) or PostgreSQL (production)
4. **Media Storage:** Google Cloud Storage (GCS) with local fallbacks.

```mermaid
graph TD;
    User((Visitor)) -->|HTTPS| Frontend[Next.js Frontend\n(bun)]
    Frontend -->|REST API Calls| Backend[FastAPI Backend]
    Backend -->|SQL| Database[(SQLite/PostgreSQL)]
    Frontend -->|Fetches Images| Storage[(GCS + Local Fallback)]
    Backend -->|Uploads Media| Storage
```

## 1. Frontend: Next.js with Bun
- **Framework:** Built with React, Next.js (App Router), and TypeScript.
- **Styling:** Tailwind CSS combined with `lucide-react` for icons.
- **Tooling:** Uses `bun` exclusively as the package manager for faster dependency resolution.
- **Package Management:** Enforced bun usage with validation scripts to prevent npm/yarn conflicts.
- **Data Fetching:** The frontend is entirely dynamic. It fetches projects and research data from the FastAPI backend at runtime or build time, displaying skeleton loaders while the data is being fetched client-side.
- **Image Optimization:** Next.js `<Image>` component is configured to automatically optimize and serve images retrieved from Google Cloud Storage (`storage.googleapis.com`), improving Largest Contentful Paint (LCP) and overall load speeds.
- **Hosting:** Deployed to Netlify, utilizing their global Edge CDN to serve the static assets rapidly.

## 2. Backend API: FastAPI with Flexible Database
- **Framework:** Python-based FastAPI framework for building RESTful APIs.
- **ORM:** SQLAlchemy is used to interface with the database, allowing for easy schema definitions and migrations.
- **Database Flexibility:** Supports both SQLite (local development) and PostgreSQL (production) through configuration.
- **Authentication:** Write operations (`POST`, `DELETE`, `/upload`) are secured using a custom `X-API-Key` header, preventing unauthorized modifications.
- **Local Development:** Uses SQLite for simple setup without requiring external database services.
- **Production Ready:** Can be deployed on Google Cloud Run or other platforms with PostgreSQL support.

## 3. Database: SQLite (Local) / PostgreSQL (Production)
- **Local Development:** SQLite database (`test.db`) for simple, file-based storage during development.
- **Production:** PostgreSQL for scalable, production-grade data storage.
- **Schema:** Contains tables for `projects`, `research`, `experiences`, and `skills`. Structured to handle complex JSON types for arrays of images, videos, and technical details.
- **Migration:** Easy transition from SQLite to PostgreSQL by changing the `DATABASE_URL` in environment configuration.

## 4. Media Storage: Google Cloud Storage (GCS) with Local Fallbacks
- **Function:** Stores all heavy static assets (images, PDFs, videos) that were previously bloating the repository size.
- **Integration:** The FastAPI backend exposes an `/api/upload` endpoint. When the site owner uploads a file, the backend authenticates the request, generates a unique UUID filename, pushes the file to the GCS bucket, and returns the public URL.
- **Delivery:** The frontend fetches these images directly from the GCS bucket URLs via the Next.js optimized `<Image>` component, offloading bandwidth from both the Next.js server and the FastAPI backend.
- **Local Fallbacks:** Implemented comprehensive fallback system in `src/utils/media.ts` that uses local images when GCS assets are missing, preventing 404 errors during development.
- **Image Handling:** Over 40 missing image paths are mapped to use existing local fallback images.

## Benefits of this Architecture
1. **Repository Size:** By moving hardcoded `.ts` data to the database and `public/images/` to GCS, the Git repository is drastically smaller, faster to clone, and easier to navigate.
2. **Dynamic Updates:** The portfolio can be updated instantly by making API calls to the backend (or using the Swagger UI at `/api/docs`) without requiring a redeployment or code commit.
3. **Performance:** Lazy loading, Next.js image optimization, and comprehensive image fallback system ensure lightning-fast load times and no 404 errors.
4. **Cost:** SQLite (local) is free, and the architecture can scale to PostgreSQL/Cloud Run with minimal cost when deployed.
5. **Developer Experience:** Bun package manager provides faster installs, and the local SQLite setup allows immediate development without external services.
6. **Flexibility:** Easy switching between local development (SQLite) and production (PostgreSQL) through environment configuration.
