import { demoAmbulances, demoHospitals } from '../data/demo.js';

export function getNearestAvailableAmbulance(lat = 0, lng = 0) {
  return [...demoAmbulances]
    .filter((ambulance) => ambulance.status !== 'Offline')
    .map((ambulance) => ({
      ...ambulance,
      score: Math.hypot(ambulance.lat - lat, ambulance.lng - lng),
    }))
    .sort((left, right) => left.score - right.score)[0];
}

export function getHospitalLoadSummary() {
  return demoHospitals.map((hospital) => ({
    id: hospital.id,
    name: hospital.name,
    load: hospital.load,
    icu_beds: hospital.icu_beds,
    emergency_beds: hospital.emergency_beds,
    rating: hospital.rating,
  }));
}
