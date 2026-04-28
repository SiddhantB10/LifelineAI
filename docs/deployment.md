# Deployment Guide

## Frontend on Firebase Hosting

1. Build the frontend: `npm run build` from the `frontend` folder.
2. Deploy using the Firebase CLI: `firebase deploy --only hosting` (hosting configured in `firebase.json`).
3. Provide `VITE_FIREBASE_CONFIG` (JSON string) in your CI/hosting environment.

## Backend as Firebase Functions

1. The backend has been migrated to Firebase Functions (source: `backend/functions`).
2. Use the Firebase CLI to emulate or deploy functions: `firebase emulators:start --only functions` or `firebase deploy --only functions`.
3. Provide `GEMINI_API_KEY` and `FCM_SERVER_KEY` via Firebase environment config or CI env vars.

## Firestore

This project now uses Firestore for runtime persistence and Firebase Auth for user authentication. If you previously used the SQL schema, the normalized SQL files are kept under `database/` for reference but production reads/writes should use Firestore.

## Demo flow

1. Open the public landing page.
2. Log in as citizen, driver, hospital, operator, or admin.
3. Trigger SOS, dispatch, and dashboard flows to show live value.
