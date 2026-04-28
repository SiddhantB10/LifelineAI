import { randomUUID } from 'node:crypto';
import { demoEmergencies, demoNotifications } from '../data/demo.js';
import { datasetInsights } from '../data/datasetInsights.js';
import { detectSeverity, detectSpam, matchHospital } from '../services/ai.js';
import { getNearestAvailableAmbulance } from '../services/dispatch.js';

function getCurrentTimeSlot() {
  const hour = new Date().getHours();
  if (hour < 6) return 'night';
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}

export async function createEmergency(req, res) {
  const { user_id = 'u1', type = 'Emergency', description = '', lat = 0, lng = 0, voiceTranscript = '', emergencyType = type } = req.body ?? {};
  const severity = detectSeverity({ text: description, voiceTranscript }).severity;
  const ambulance = getNearestAvailableAmbulance(lat, lng);
  const hospital = matchHospital({ lat, lng, specialty: emergencyType, severity });
  const safety = detectSpam({ description, repeatCount: 0 });
  const currentSlot = getCurrentTimeSlot();
  const trafficProfile = datasetInsights.traffic.averagesByTime.find((entry) => entry.timeOfDay === currentSlot) ?? datasetInsights.traffic.averagesByTime[0];
  const demandProfile = datasetInsights.ambulanceDemand.timeSlotBreakdown.find((entry) => entry.key === currentSlot.charAt(0).toUpperCase() + currentSlot.slice(1)) ?? datasetInsights.ambulanceDemand.timeSlotBreakdown[0];
  const trafficDelay = Math.max(0, Math.round((trafficProfile?.avgWaitingTime ?? 0) / 12));
  const demandDelay = (demandProfile?.value ?? 0) > 15000 ? 3 : (demandProfile?.value ?? 0) > 10000 ? 1 : 0;

  const emergency = {
    id: randomUUID(),
    user_id,
    type: emergencyType,
    severity,
    description,
    lat,
    lng,
    status: 'Dispatched',
    etaMinutes: (ambulance?.eta ?? 6) + trafficDelay + demandDelay,
    assigned_ambulance_id: ambulance?.id,
    assigned_hospital_id: hospital?.id,
    created_at: new Date().toISOString(),
  };

  demoEmergencies.unshift(emergency);
  demoNotifications.push({ id: randomUUID(), user_id, title: 'Ambulance assigned', message: `Ambulance ${ambulance?.name ?? 'en route'} assigned`, read: false });

  res.status(201).json({ message: 'Emergency created', emergency, fakeCheck: safety, matchedHospital: hospital });
}

export async function getEmergency(req, res) {
  const emergency = demoEmergencies.find((item) => item.id === req.params.id) ?? demoEmergencies[0];
  res.json({ emergency });
}

export async function updateProfile(req, res) {
  const profile = {
    ...req.body,
    updated_at: new Date().toISOString(),
  };

  res.json({ message: 'Profile updated', profile });
}
