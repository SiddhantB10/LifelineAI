# Deployment Guide

## Frontend on Firebase Hosting

1. Build the frontend locally with `npm run build` from the `frontend` folder.
2. Push to GitHub `main` to trigger the deploy workflow in `.github/workflows/firebase-deploy.yml`.
3. The workflow deploys the `web` hosting target from `frontend/dist` to Firebase Hosting.
4. Provide `VITE_FIREBASE_CONFIG`, `VITE_FIREBASE_VAPID_KEY`, `VITE_API_URL`, and `GEMINI_API_KEY` as GitHub repository secrets.

## Backend as Firebase Functions

1. The backend is deployed from `backend/functions`.
2. Functions deploys require the Blaze plan and the Firebase service-account secret in GitHub Actions.
3. Use `firebase emulators:start --only functions` locally, or push to GitHub to deploy automatically.
4. `GEMINI_API_KEY` and the service-account JSON are injected in CI from repository secrets.

## Firestore

This project now uses Firestore for runtime persistence and Firebase Auth for user authentication. If you previously used the SQL schema, the normalized SQL files are kept under `database/` for reference but production reads/writes should use Firestore.

Before seeding demo data, enable the Firestore API in the Google Cloud console.

## Demo flow

1. Open the public landing page.
2. Log in as citizen, driver, hospital, operator, or admin.
3. Trigger SOS, dispatch, and dashboard flows to show live value.
