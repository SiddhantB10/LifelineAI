export type Role = 'citizen' | 'driver' | 'hospital' | 'operator' | 'admin';

export type EmergencySeverity = 'Low' | 'Medium' | 'Critical';

export type EmergencyStatus =
  | 'Reported'
  | 'Dispatched'
  | 'En Route'
  | 'Arrived Pickup'
  | 'Onboard'
  | 'At Hospital'
  | 'Closed';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: Role;
  blood_group?: string;
  allergies?: string;
  created_at: string;
}

export interface EmergencyRecord {
  id: string;
  type: string;
  severity: EmergencySeverity;
  description: string;
  lat: number;
  lng: number;
  status: EmergencyStatus;
  etaMinutes: number;
  assigned_ambulance_id?: string;
  assigned_hospital_id?: string;
  created_at: string;
}

export interface HospitalRecord {
  id: string;
  name: string;
  lat: number;
  lng: number;
  icu_beds: number;
  emergency_beds: number;
  specialties: string[];
  rating: number;
  load: number;
}

export interface AmbulanceRecord {
  id: string;
  driver_id: string;
  lat: number;
  lng: number;
  status: 'Available' | 'Busy' | 'Offline';
  name: string;
  eta?: number;
}
