import { demoAmbulances, demoHospitals } from '../data/demo.js';

export function getNearestAvailableAmbulance(lat = 0, lng = 0) {
  if (demoAmbulances.length === 0) {
    return null; // No ambulances available - should query Firebase Realtime DB in production
  }

  return [...demoAmbulances]
    .filter((ambulance) => ambulance.status !== 'Offline')
    .map((ambulance) => ({
      ...ambulance,
      score: Math.hypot(ambulance.lat - lat, ambulance.lng - lng),
    }))
    .sort((left, right) => left.score - right.score)[0] ?? null;
}

export function getHospitalLoadSummary() {
  if (demoHospitals.length === 0) {
    return []; // No hospitals - should query Firestore in production
  }

  return demoHospitals.map((hospital) => ({
    id: hospital.id,
    name: hospital.name,
    load: hospital.load,
    icu_beds: hospital.icu_beds,
    emergency_beds: hospital.emergency_beds,
    rating: hospital.rating,
  }));
}
