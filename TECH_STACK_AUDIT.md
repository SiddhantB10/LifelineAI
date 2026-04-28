# 🔍 Lifeline AI - Tech Stack Audit Report

**Generated:** April 28, 2026

---

## ✅ IMPLEMENTED & PROPERLY USED

### Frontend (React + Vite + Tailwind)
- ✅ **React.js v18.3.1** - Core frontend framework (working)
- ✅ **Vite v5.4.19** - Build tool (configured in package.json)
- ✅ **Tailwind CSS v3.4.17** - Styling framework (postcss autoprefixer configured)
- ✅ **Lucide React** - Icons library (7 components already using it: DashboardLayout, HomePage, FeaturesPage, AdminDashboard, CitizenDashboard, etc.)
- ✅ **Leaflet.js v1.9.4** - Map library (in package.json)
- ✅ **react-leaflet v4.2.1** - React wrapper for Leaflet (in package.json)

### Backend & Infrastructure
- ✅ **Firebase Functions** - Serverless backend (freshly ported from Express - backend/functions/index.js with HTTP API)
- ✅ **Firestore** - Database (backend/functions/index.js using db.collection() with Firestore)
- ✅ **Firebase Auth SDK** - Authentication framework (firebase/auth imported in frontend/src/services/firebase.ts)
- ✅ **Firebase Storage SDK** - File storage (firebase/storage imported in frontend/src/services/firebase.ts)
- ✅ **Firebase Messaging SDK** - FCM setup (firebase/messaging imported in frontend/src/services/firebase.ts)
- ✅ **Firebase Hosting** - Hosting configuration (firebase.json configured with frontend/dist as public root)
- ✅ **firebase-admin v11.7.0** - Backend admin SDK (backend/functions/package.json)
- ✅ **firebase-functions v4.4.0** - Functions SDK (backend/functions/package.json)

### Development & Version Control
- ✅ **Git + GitHub** - Version control (.github/copilot-instructions.md, .gitignore present)
- ✅ **.env Configuration** - Environment variables (.env.example with VITE_FIREBASE_CONFIG, GEMINI_API_KEY, etc.)
- ✅ **Node.js with TypeScript** - Type safety (TypeScript in frontend devDependencies)

### Data & Analytics
- ✅ **Dataset Curation Pipeline** - Python/Node script (scripts/curate-datasets.mjs working)
- ✅ **Runtime Insights** - Generated file (backend/src/data/datasetInsights.js - traffic, ambulance demand, road accidents)

### AI/ML Heuristics (Currently Hardcoded)
- ✅ **Severity Detection** - Rule-based (backend/src/services/ai.js - detectSeverity function)
- ✅ **Hospital Matching** - Algorithm-based (backend/src/services/ai.js - matchHospital function)
- ✅ **Spam Detection** - Heuristic-based (backend/src/services/ai.js - detectSpam function)

---

## ⚠️ PARTIALLY IMPLEMENTED (Need Fixes)

### State Management
- 🟡 **Context API** - Exists but minimal (frontend/src/context/ folder exists)
  - Issue: No active Zustand store implemented
  - Fix: Add Zustand to package.json and create store for app state

### Form Handling
- 🟡 **React Hook Form** - NOT in frontend/package.json
  - Issue: Forms are likely using native React state
  - Fix: Install and implement across form components

### Animations
- 🟡 **Framer Motion** - REMOVED during Firebase migration
  - Issue: UI lacks polish; simplified with Tailwind only
  - Fix: Re-add Framer Motion or keep Tailwind-only approach

### 3D Effects
- 🟡 **Three.js / React Three Fiber** - REMOVED during Firebase migration
  - Issue: Hero section simplified
  - Fix: Either restore with lightweight alternative or keep simplified

---

## ❌ NOT IMPLEMENTED (Critical Gaps)

### Mobile
- ❌ **Flutter** - NO Flutter app project exists
  - Status: Missing entirely
  - Priority: HIGH - User stack requires Flutter mobile app
  - Required Files: pubspec.yaml, lib/main.dart, etc.

### Maps & Routing
- ❌ **OpenStreetMap** - Leaflet added but OSM tiles not configured
  - Status: Leaflet installed but not wired to components
  - Priority: HIGH - EmergencyMap.tsx needs OSM integration
  
- ❌ **OSRM / OpenRouteService** - NO routing/ETA service integrated
  - Status: Missing entirely
  - Current: Fake ETA calculation in backend
  - Priority: HIGH - Needed for accurate ambulance ETAs

### AI Integration
- ❌ **Gemini API (Free Tier)** - NO integration yet
  - Status: Placeholder in .env only
  - Current: Hardcoded heuristics in backend/src/services/ai.js
  - Priority: HIGH - Should replace rule-based detection
  - Missing: API client code, prompt engineering, async handlers in Functions

### Notifications
- ❌ **Firebase Cloud Messaging (FCM)** - SDK imported but not implemented
  - Status: Only SDK initialized in frontend
  - Current: Simple Firestore write to notifications collection
  - Missing: Service worker, token registration, push handling
  - Priority: HIGH - Critical for real-time alerts

### Analytics & Charting
- ❌ **Recharts** - NOT in frontend/package.json (only in old lockfile)
  - Status: Missing
  - Use Case: AdminDashboard metrics visualization
  - Priority: MEDIUM - Needed for analytics views

### ML / Deep Learning
- ❌ **Python + Scikit-learn** - NO Python environment
  - Status: Missing entirely
  - Use Case: Could power CV analysis from images
  - Priority: LOW - Optional enhancement

- ❌ **TensorFlow / PyTorch** - NO deep learning setup
  - Status: Missing entirely
  - Priority: LOW - Optional enhancement

- ❌ **YOLOv8** - NO computer vision pipeline
  - Status: Missing entirely
  - Use Case: Could analyze injury severity from images
  - Priority: LOW - Optional enhancement

### Firestore Realtime Features
- ❌ **Firestore Listeners** - SDK present but not wired
  - Status: Missing subscription implementation
  - Use Case: Live updates for emergencies, ambulance location, notifications
  - Priority: HIGH - Essential for app responsiveness

---

## 📋 SUMMARY TABLE

| Technology | Required | Implemented | Status | Priority | Action |
|-----------|----------|-------------|--------|----------|--------|
| React.js | ✅ | ✅ | ✅ Working | - | None |
| Vite | ✅ | ✅ | ✅ Working | - | None |
| Tailwind CSS | ✅ | ✅ | ✅ Working | - | None |
| Lucide React | ✅ | ✅ | ✅ Working | - | None |
| Framer Motion | ✅ | ❌ | ⚠️ Removed | MEDIUM | Restore or keep simplified |
| Three.js | ✅ | ❌ | ⚠️ Removed | LOW | Restore or keep simplified |
| Flutter | ✅ | ❌ | ❌ Missing | HIGH | Create Flutter app scaffold |
| Firebase Hosting | ✅ | ✅ | ✅ Config ready | - | None |
| Firebase Functions | ✅ | ✅ | ✅ Deployed | - | None |
| Firestore | ✅ | ✅ | ✅ Schema ready | - | None |
| Firebase Auth | ✅ | ⚠️ | ⚠️ Partial | MEDIUM | Wire authentication flow |
| Firebase Storage | ✅ | ✅ | ✅ SDK ready | - | None |
| Firestore Listeners | ✅ | ❌ | ❌ Missing | HIGH | Implement snapshot listeners |
| FCM Notifications | ✅ | ⚠️ | ⚠️ SDK only | HIGH | Wire service worker + tokens |
| Gemini API | ✅ | ❌ | ❌ Missing | HIGH | Integrate with Functions |
| Leaflet.js | ✅ | ✅ | ✅ Installed | - | Wire to EmergencyMap |
| OpenStreetMap | ✅ | ❌ | ❌ Missing | HIGH | Configure OSM tiles in Leaflet |
| OSRM | ✅ | ❌ | ❌ Missing | HIGH | Integrate routing service |
| Recharts | ✅ | ❌ | ❌ Missing | MEDIUM | Add for AdminDashboard |
| React Hook Form | ✅ | ❌ | ❌ Missing | MEDIUM | Implement form validation |
| Zustand | ✅ | ❌ | ❌ Missing | MEDIUM | Create global state store |
| Python ML | ✅ | ❌ | ❌ Missing | LOW | Optional enhancement |
| TensorFlow/PyTorch | ✅ | ❌ | ❌ Missing | LOW | Optional enhancement |
| YOLOv8 | ✅ | ❌ | ❌ Missing | LOW | Optional enhancement |
| Git + GitHub | ✅ | ✅ | ✅ Working | - | None |
| Figma | ✅ | 🔲 | 🔲 UI mockups | - | External tool |

---

## 🚀 RECOMMENDED NEXT STEPS

### Phase 1: Core Essentials (This Session)
1. ✅ Firebase Functions + Firestore (DONE)
2. 📌 Add missing NPM packages: Recharts, React Hook Form, Zustand
3. 📌 Implement Firestore snapshot listeners for realtime
4. 📌 Implement Gemini API integration in Functions
5. 📌 Setup FCM with service worker

### Phase 2: Mobile & Maps (Next Session)
6. 📌 Scaffold Flutter mobile app
7. 📌 Configure OpenStreetMap with Leaflet
8. 📌 Integrate OSRM for routing/ETA
9. 📌 Wire Firebase Auth across platform

### Phase 3: ML Enhancements (Optional)
10. 📌 Setup Python ML environment (Scikit-learn for analytics)
11. 📌 Optional: YOLOv8 for image-based injury detection

---

## 📝 NOTES
- Old lockfile references removed packages; clean install needed
- Framer Motion & Three.js removed during Firebase migration; can be restored
- Dataset curation pipeline working and generating insights
- Backend successfully migrated to Firebase Functions with Firestore
