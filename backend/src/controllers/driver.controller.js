import { demoAmbulances, demoEmergencies } from '../data/demo.js';

export async function requestsNearby(req, res) {
  try {
    const requests = demoEmergencies.filter((entry) => entry.status === 'Reported' || entry.status === 'Dispatched');
    res.json({ 
      requests,
      warning: requests.length === 0 ? 'Demo mode: Fetch nearby emergencies from Firestore in production' : undefined
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function acceptAmbulance(req, res) {
  try {
    const { ambulance_id, emergency_id } = req.body ?? {};
    const ambulance = demoAmbulances.find((entry) => entry.id === ambulance_id) ?? (demoAmbulances.length > 0 ? demoAmbulances[0] : null);
    const emergency = demoEmergencies.find((entry) => entry.id === emergency_id) ?? (demoEmergencies.length > 0 ? demoEmergencies[0] : null);

    if (ambulance) {
      ambulance.status = 'Busy';
    }
    if (emergency) {
      emergency.status = 'En Route';
      emergency.assigned_ambulance_id = ambulance?.id;
    }

    res.json({ 
      message: 'Request accepted',
      warning: !ambulance || !emergency ? 'Demo mode: Accept through Firebase in production' : undefined,
      ambulance, 
      emergency 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateLocation(req, res) {
  try {
    const { ambulance_id, lat, lng, emergencyId } = req.body ?? {};
    const ambulance = demoAmbulances.find((entry) => entry.id === ambulance_id) ?? (demoAmbulances.length > 0 ? demoAmbulances[0] : null);

    if (ambulance) {
      ambulance.lat = Number(lat ?? ambulance.lat);
      ambulance.lng = Number(lng ?? ambulance.lng);
    }

    res.json({ 
      message: 'Location updated',
      warning: !ambulance ? 'Demo mode: Update locations in Firebase Realtime DB in production' : undefined,
      ambulance, 
      emergencyId 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateStatus(req, res) {
  try {
    const { emergency_id, status } = req.body ?? {};
    const emergency = demoEmergencies.find((entry) => entry.id === emergency_id) ?? (demoEmergencies.length > 0 ? demoEmergencies[0] : null);

    if (emergency && status) {
      emergency.status = status;
    }

    res.json({ 
      message: 'Status updated',
      warning: !emergency ? 'Demo mode: Update status in Firestore in production' : undefined,
      emergency 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
