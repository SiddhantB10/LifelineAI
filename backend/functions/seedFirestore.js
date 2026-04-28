const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// This script seeds Firestore with demo data from seedData.json
// Usage: set GOOGLE_APPLICATION_CREDENTIALS to your service account json and run: node seedFirestore.js

async function main() {
  const dataPath = path.join(__dirname, 'seedData.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const seed = JSON.parse(raw);

  admin.initializeApp();
  const db = admin.firestore();

  console.log('Seeding Firestore...');

  const writes = [];

  for (const u of seed.users) {
    writes.push(db.collection('users').doc(u.id).set(u));
  }
  for (const h of seed.hospitals) {
    writes.push(db.collection('hospitals').doc(h.id).set(h));
  }
  for (const a of seed.ambulances) {
    writes.push(db.collection('ambulances').doc(a.id).set(a));
  }
  for (const e of seed.emergencies) {
    writes.push(db.collection('emergencies').doc(e.id).set(e));
  }
  for (const n of seed.notifications) {
    const id = n.id || db.collection('notifications').doc().id;
    writes.push(db.collection('notifications').doc(id).set({ ...n, id }));
  }
  // analytics empty for now

  await Promise.all(writes);
  console.log('Seeding complete.');
  process.exit(0);
}

main().catch((e) => {
  console.error('Seed failed', e);
  process.exit(1);
});
