# Application Architecture

This document describes the modern, decoupled, serverless architecture used by this portfolio website. By separating the frontend, backend, database, and media storage, the application achieves high scalability, low repository size, and fast global loading times.

## Overview

The system is composed of four main pillars:
1. **Frontend:** Next.js (React) deployed on Netlify.
2. **Backend API:** FastAPI (Python) deployed as a Docker container on Google Cloud Run.
3. **Database:** PostgreSQL (Serverless) hosted on Neon.
4. **Media Storage:** Google Cloud Storage (GCS).

```mermaid
graph TD;
    User((Visitor)) -->|HTTPS| Frontend[Next.js Frontend\n(Netlify)]
    Frontend -->|REST API Calls| Backend[FastAPI Backend\n(Google Cloud Run)]
    Backend -->|SQL| Database[(PostgreSQL DB\nNeon)]
    Frontend -->|Fetches Images/Video| GCS[(Google Cloud Storage)]
    Backend -->|Uploads Media| GCS
```

## 1. Frontend: Next.js on Netlify
- **Framework:** Built with React, Next.js (App Router), and TypeScript.
- **Styling:** Tailwind CSS combined with `lucide-react` for icons.
- **Tooling:** Uses `bun` as the package manager for faster dependency resolution.
- **Data Fetching:** The frontend is entirely dynamic. It fetches projects and research data from the FastAPI backend at runtime or build time, displaying skeleton loaders while the data is being fetched client-side.
- **Image Optimization:** Next.js `<Image>` component is configured to automatically optimize and serve images retrieved from Google Cloud Storage (`storage.googleapis.com`), improving Largest Contentful Paint (LCP) and overall load speeds.
- **Hosting:** Deployed to Netlify, utilizing their global Edge CDN to serve the static assets rapidly.

## 2. Backend API: FastAPI on Google Cloud Run
- **Framework:** Python-based FastAPI framework for building RESTful APIs.
- **ORM:** SQLAlchemy is used to interface with the database, allowing for easy schema definitions and migrations.
- **Dockerized:** The backend is packaged into a Docker container, ensuring identical environments across local development and production.
- **Authentication:** Write operations (`POST`, `DELETE`, `/upload`) are secured using a custom `X-API-Key` header, preventing unauthorized modifications.
- **Hosting:** Deployed on Google Cloud Run. This is a serverless environment that automatically scales instances based on incoming traffic and scales to zero when not in use, making it incredibly cost-effective.

## 3. Database: Neon (Serverless PostgreSQL)
- **Engine:** PostgreSQL.
- **Schema:** Contains tables for `projects`, `research`, `experiences`, and `skills`. Structured to handle complex JSON types for arrays of images, videos, and technical details.
- **Hosting:** Hosted on Neon, which provides a serverless PostgreSQL offering. It separates storage and compute, allowing for features like instant branching and auto-scaling compute endpoints.

## 4. Media Storage: Google Cloud Storage (GCS)
- **Function:** Stores all heavy static assets (images, PDFs, videos) that were previously bloating the repository size.
- **Integration:** The FastAPI backend exposes an `/api/upload` endpoint. When the site owner uploads a file, the backend authenticates the request, generates a unique UUID filename, pushes the file to the GCS bucket, and returns the public URL.
- **Delivery:** The frontend fetches these images directly from the GCS bucket URLs via the Next.js optimized `<Image>` component, offloading bandwidth from both the Next.js server and the FastAPI backend.

## Benefits of this Architecture
1. **Repository Size:** By moving hardcoded `.ts` data to the database and `public/images/` to GCS, the Git repository is drastically smaller, faster to clone, and easier to navigate.
2. **Dynamic Updates:** The portfolio can be updated instantly by making API calls to the backend (or using the Swagger UI at `/api/docs`) without requiring a redeployment or code commit.
3. **Performance:** Lazy loading, Next.js image optimization, and Netlify's CDN ensure lightning-fast load times.
4. **Cost:** Both Neon and Cloud Run have generous free tiers and scale to zero, meaning hosting this complex architecture costs pennies (if anything) per month.
