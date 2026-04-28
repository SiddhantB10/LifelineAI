const functions = require('firebase-functions');
const admin = require('firebase-admin');
require('dotenv').config();

admin.initializeApp();
const db = admin.firestore();

// Simple HTTP API router for demo endpoints using Firestore
exports.api = functions.https.onRequest(async (req, res) => {
  try {
    const url = req.path || '/';
    // Normalize path (remove trailing slash)
    const path = url.replace(/\/$/, '') || '/';

    // AUTH: signup
    if (req.method === 'POST' && path === '/signup') {
      const { name, email, phone, role = 'citizen' } = req.body ?? {};
      const userRef = db.collection('users').doc();
      const user = {
        id: userRef.id,
        name: name || 'New User',
        phone: phone || '+91 90000 00000',
        email: email || `${Date.now()}@lifeline.test`,
        role,
        created_at: new Date().toISOString(),
      };
      await userRef.set(user);
      // WARNING: Should generate Firebase Auth token here
      // In production, use: const token = await admin.auth().createCustomToken(user.id);
      return res.status(201).json({ message: 'Account created', user, warning: 'Use Firebase Auth in production' });
    }

    // AUTH: login
    if (req.method === 'POST' && path === '/login') {
      const { email, role = 'citizen' } = req.body ?? {};
      const usersSnap = await db.collection('users').where('email', '==', email).where('role', '==', role).limit(1).get();
      let user;
      if (!usersSnap.empty) user = usersSnap.docs[0].data();
      else {
        // fallback: return first user
        const all = await db.collection('users').limit(1).get();
        user = all.empty ? null : all.docs[0].data();
      }
      // WARNING: Should generate Firebase Auth token here
      // In production, use: const token = user ? await admin.auth().createCustomToken(user.id) : null;
      return res.json({ message: 'Signed in', user, warning: 'Use Firebase Auth in production' });
    }

    // CREATE emergency
    if (req.method === 'POST' && path === '/emergencies') {
      const { user_id = null, type = 'Emergency', description = '', lat = 0, lng = 0 } = req.body ?? {};
      // simple severity heuristic
      const severity = description.toLowerCase().includes('bleed') || description.toLowerCase().includes('chest') ? 'Critical' : 'Medium';
      const emergencyRef = db.collection('emergencies').doc();
      const emergency = {
        id: emergencyRef.id,
        user_id,
        type,
        severity,
        description,
        lat: Number(lat),
        lng: Number(lng),
        status: 'Dispatched',
        etaMinutes: 6,
        assigned_ambulance_id: null,
        assigned_hospital_id: null,
        created_at: new Date().toISOString(),
      };
      await emergencyRef.set(emergency);
      // write a notification
      const notifRef = db.collection('notifications').doc();
      await notifRef.set({ id: notifRef.id, user_id, title: 'Ambulance assigned', message: 'Ambulance en route', read: false, created_at: new Date().toISOString() });
      return res.status(201).json({ message: 'Emergency created - Database only, no auth tokens in this endpoint', emergency });
    }

    // GET emergency by id
    if (req.method === 'GET' && path.startsWith('/emergencies/')) {
      const id = path.split('/')[2];
      const doc = await db.collection('emergencies').doc(id).get();
      if (!doc.exists) return res.status(404).json({ message: 'Not found' });
      return res.json({ emergency: doc.data() });
    }

    // DRIVER: nearby requests
    if (req.method === 'GET' && path === '/driver/requests') {
      const snap = await db.collection('emergencies').where('status', 'in', ['Reported', 'Dispatched']).get();
      const requests = snap.docs.map((d) => d.data());
      return res.json({ requests });
    }

    // DRIVER: accept ambulance
    if (req.method === 'POST' && path === '/driver/accept') {
      const { ambulance_id, emergency_id } = req.body ?? {};
      const ambRef = db.collection('ambulances').doc(ambulance_id);
      const emRef = db.collection('emergencies').doc(emergency_id);
      await ambRef.update({ status: 'Busy' }).catch(() => {});
      await emRef.update({ status: 'En Route', assigned_ambulance_id: ambulance_id }).catch(() => {});
      const [ambDoc, emDoc] = await Promise.all([ambRef.get(), emRef.get()]);
      return res.json({ message: 'Request accepted - Demo mode', ambulance: ambDoc.exists ? ambDoc.data() : null, emergency: emDoc.exists ? emDoc.data() : null, warning: 'Integrate with proper authentication in production' });
    }

    // DRIVER: update location
    if (req.method === 'POST' && path === '/driver/location') {
      const { ambulance_id, lat, lng } = req.body ?? {};
      const ambRef = db.collection('ambulances').doc(ambulance_id);
      await ambRef.update({ lat: Number(lat), lng: Number(lng) }).catch(() => {});
      const amb = (await ambRef.get()).data();
      return res.json({ message: 'Location updated - Demo mode', ambulance: amb, warning: 'Should verify driver authentication in production' });
    }

    // DRIVER: update status
    if (req.method === 'POST' && path === '/driver/status') {
      const { emergency_id, status } = req.body ?? {};
      const emRef = db.collection('emergencies').doc(emergency_id);
      await emRef.update({ status }).catch(() => {});
      const em = (await emRef.get()).data();
      return res.json({ message: 'Status updated - Demo mode', emergency: em, warning: 'Should verify driver authentication in production' });
    }

    return res.status(404).json({ message: 'Unknown route', path, method: req.method });
  } catch (err) {
    console.error('functions.api error', err);
    return res.status(500).json({ message: 'Internal error', error: String(err) });
  }
});
