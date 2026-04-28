import { demoHospitals, demoEmergencies } from '../data/demo.js';

export async function incomingCases(req, res) {
  try {
    res.json({ 
      cases: demoEmergencies,
      warning: demoEmergencies.length === 0 ? 'Demo mode: Fetch incoming cases from Firestore in production' : undefined
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateBeds(req, res) {
  try {
    const { hospital_id, icu_beds, emergency_beds } = req.body ?? {};
    const hospital = demoHospitals.find((entry) => entry.id === hospital_id) ?? (demoHospitals.length > 0 ? demoHospitals[0] : null);

    if (hospital) {
      hospital.icu_beds = Number(icu_beds ?? hospital.icu_beds);
      hospital.emergency_beds = Number(emergency_beds ?? hospital.emergency_beds);
    }

    res.json({ 
      message: 'Beds updated',
      warning: !hospital ? 'Demo mode: Update hospital beds in Firestore in production' : undefined,
      hospital 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
