# LIFELINE AI

Smart emergency response, ambulance dispatch, and hospital routing platform.

This workspace contains a production-oriented full-stack scaffold with:

 - React + Vite + Tailwind frontend (Leaflet + OpenStreetMap for maps)
 - Firebase Hosting + Firebase Functions backend
 - Firestore for persistence and Firebase Auth for authentication
- Role-based emergency workflows
- AI service endpoints for severity, routing, and fake report detection

## Structure

 - `frontend/` public landing site and role dashboards
 - `backend/functions/` Firebase Functions handlers and cloud code
 - `database/` legacy SQL schema (kept for reference)
- `docs/` deployment and demo notes

## Run locally

1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies in the root and both workspaces.
3. Run `npm run dev` from the repo root.

## Deployment

- GitHub push to `main` triggers Firebase auto-deploy via `.github/workflows/firebase-deploy.yml`
- Frontend: Firebase Hosting target `web` -> `lifelineai-100`
- Backend: Firebase Functions in `backend/functions`
- Database/Auth: Firestore + Firebase Auth

## Required Cloud Setup

- Firebase project: `lifeline-ai-67fac`
- Blaze plan enabled for Functions deploys
- Firestore API enabled before seeding demo data
- GitHub repository secrets configured for Firebase and Gemini
