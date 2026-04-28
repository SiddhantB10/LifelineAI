import { demoAmbulances, demoEmergencies } from '../data/demo.js';

export async function requestsNearby(req, res) {
  res.json({ requests: demoEmergencies.filter((entry) => entry.status === 'Reported' || entry.status === 'Dispatched') });
}

export async function acceptAmbulance(req, res) {
  const { ambulance_id, emergency_id } = req.body ?? {};
  const ambulance = demoAmbulances.find((entry) => entry.id === ambulance_id) ?? demoAmbulances[0];
  const emergency = demoEmergencies.find((entry) => entry.id === emergency_id) ?? demoEmergencies[0];

  if (ambulance) {
    ambulance.status = 'Busy';
  }
  if (emergency) {
    emergency.status = 'En Route';
    emergency.assigned_ambulance_id = ambulance?.id;
  }

  res.json({ message: 'Request accepted', ambulance, emergency });
}

export async function updateLocation(req, res) {
  const { ambulance_id, lat, lng, emergencyId } = req.body ?? {};
  const ambulance = demoAmbulances.find((entry) => entry.id === ambulance_id) ?? demoAmbulances[0];

  if (ambulance) {
    ambulance.lat = Number(lat ?? ambulance.lat);
    ambulance.lng = Number(lng ?? ambulance.lng);
  }

  res.json({ message: 'Location updated', ambulance, emergencyId });
}

export async function updateStatus(req, res) {
  const { emergency_id, status } = req.body ?? {};
  const emergency = demoEmergencies.find((entry) => entry.id === emergency_id) ?? demoEmergencies[0];

  if (emergency && status) {
    emergency.status = status;
  }

  res.json({ message: 'Status updated', emergency });
}
