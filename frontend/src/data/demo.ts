import { AmbulanceRecord, EmergencyRecord, HospitalRecord, UserProfile } from '../types';

export const demoStats = [
  { label: 'Avg Response Time', value: '4.8 min', delta: '-32%' },
  { label: 'Critical Cases Routed', value: '1,284', delta: '+18%' },
  { label: 'Hospitals Online', value: '168', delta: '24/7' },
  { label: 'Lives Covered', value: '92k+', delta: 'This month' },
];

export const demoUsers: UserProfile[] = [
  {
    id: 'u1',
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    email: 'aarav@example.com',
    role: 'citizen',
    blood_group: 'O+',
    allergies: 'Penicillin',
    created_at: '2026-04-21T10:12:00Z',
  },
  {
    id: 'u2',
    name: 'Nikhil Verma',
    phone: '+91 98880 11223',
    email: 'nikhil@example.com',
    role: 'driver',
    created_at: '2026-04-20T09:00:00Z',
  },
  {
    id: 'u3',
    name: 'City Care Hospital',
    phone: '+91 99999 00001',
    email: 'ops@citycare.test',
    role: 'hospital',
    created_at: '2026-04-19T08:25:00Z',
  },
];

export const demoHospitals: HospitalRecord[] = [
  {
    id: 'h1',
    name: 'City Care Hospital',
    lat: 28.6139,
    lng: 77.209,
    icu_beds: 8,
    emergency_beds: 14,
    specialties: ['Cardiology', 'Trauma', 'Neurology'],
    rating: 4.9,
    load: 62,
  },
  {
    id: 'h2',
    name: 'Metro Life Medical',
    lat: 28.6239,
    lng: 77.219,
    icu_beds: 4,
    emergency_beds: 9,
    specialties: ['Pregnancy', 'Orthopedics', 'Emergency Surgery'],
    rating: 4.7,
    load: 41,
  },
  {
    id: 'h3',
    name: 'North Star Trauma Center',
    lat: 28.6039,
    lng: 77.199,
    icu_beds: 6,
    emergency_beds: 11,
    specialties: ['Trauma', 'Critical Care', 'Fire Injuries'],
    rating: 4.8,
    load: 72,
  },
];

export const demoAmbulances: AmbulanceRecord[] = [
  { id: 'a1', driver_id: 'u2', lat: 28.6122, lng: 77.2122, status: 'Busy', name: 'Ambulance 104', eta: 5 },
  { id: 'a2', driver_id: 'u4', lat: 28.6189, lng: 77.2052, status: 'Available', name: 'Ambulance 222', eta: 3 },
  { id: 'a3', driver_id: 'u5', lat: 28.6018, lng: 77.2311, status: 'Available', name: 'Ambulance 318', eta: 7 },
];

export const demoEmergencies: EmergencyRecord[] = [
  {
    id: 'e1',
    type: 'Heart Attack',
    severity: 'Critical',
    description: 'Chest pain, sweating, shortness of breath',
    lat: 28.6119,
    lng: 77.2067,
    status: 'En Route',
    etaMinutes: 4,
    assigned_ambulance_id: 'a1',
    assigned_hospital_id: 'h1',
    created_at: '2026-04-28T08:44:00Z',
  },
  {
    id: 'e2',
    type: 'Accident',
    severity: 'Medium',
    description: 'Two-wheeler collision, minor bleeding',
    lat: 28.6265,
    lng: 77.2155,
    status: 'Reported',
    etaMinutes: 9,
    created_at: '2026-04-28T08:52:00Z',
  },
];

export const dashboardModules = {
  citizen: ['SOS request', 'Live ambulance tracking', 'Family alerts', 'Medical profile'],
  driver: ['Nearby requests', 'One-tap status updates', 'Navigation', 'GPS heartbeat'],
  hospital: ['Incoming cases', 'Beds and ICU', 'Specialty match', 'Queue view'],
  operator: ['City incident stream', 'Dispatch panel', 'Emergency AI', 'Overload alerts'],
  admin: ['Heatmaps', 'Fleet status', 'Hospital load', 'Analytics'],
};
