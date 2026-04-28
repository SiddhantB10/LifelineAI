import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { demoAmbulances, demoEmergencies, demoHospitals } from '../data/demo';
import { GlassCard } from './GlassCard';

export function EmergencyMap() {
  const emergency = demoEmergencies[0];
  const ambulance = demoAmbulances[0];
  const hospital = demoHospitals[0];

  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-sm font-semibold text-white">Live Emergency Map</p>
        <p className="text-xs text-slate-400">Tracking ambulance, patient, and hospital routing in real time</p>
      </div>
      <div className="h-[360px] md:h-[460px]">
        <MapContainer center={[28.6139, 77.209]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[ambulance.lat, ambulance.lng]}>
            <Popup>{ambulance.name}</Popup>
          </Marker>
          <Marker position={[emergency.lat, emergency.lng]}>
            <Popup>Emergency site - {emergency.type}</Popup>
          </Marker>
          <Marker position={[hospital.lat, hospital.lng]}>
            <Popup>{hospital.name}</Popup>
          </Marker>
          <Polyline
            positions={[
              [ambulance.lat, ambulance.lng],
              [emergency.lat, emergency.lng],
              [hospital.lat, hospital.lng],
            ]}
            pathOptions={{ color: '#ef4444', weight: 4, dashArray: '10 10' }}
          />
        </MapContainer>
      </div>
    </GlassCard>
  );
}
