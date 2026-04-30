import { AmbulanceRecord, EmergencyRecord, HospitalRecord, UserProfile } from '../types';

// Demo data has been removed for live production
// All data will be fetched from Firebase/backend

export const demoStats: any[] = [];

export const demoUsers: UserProfile[] = [];

export const demoHospitals: HospitalRecord[] = [];

export const demoAmbulances: AmbulanceRecord[] = [];

export const demoEmergencies: EmergencyRecord[] = [];

export const dashboardModules = {
  citizen: ['SOS request', 'Live ambulance tracking', 'Family alerts', 'Medical profile'],
  driver: ['Nearby requests', 'One-tap status updates', 'Navigation', 'GPS heartbeat'],
  hospital: ['Incoming cases', 'Beds and ICU', 'Specialty match', 'Queue view'],
  operator: ['City incident stream', 'Dispatch panel', 'Emergency AI', 'Overload alerts'],
  admin: ['Heatmaps', 'Fleet status', 'Hospital load', 'Analytics'],
};
