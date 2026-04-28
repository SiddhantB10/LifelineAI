import { demoHospitals, demoEmergencies } from '../data/demo.js';

export async function incomingCases(req, res) {
  res.json({ cases: demoEmergencies });
}

export async function updateBeds(req, res) {
  const { hospital_id, icu_beds, emergency_beds } = req.body ?? {};
  const hospital = demoHospitals.find((entry) => entry.id === hospital_id) ?? demoHospitals[0];

  if (hospital) {
    hospital.icu_beds = Number(icu_beds ?? hospital.icu_beds);
    hospital.emergency_beds = Number(emergency_beds ?? hospital.emergency_beds);
  }

  res.json({ message: 'Beds updated', hospital });
}
