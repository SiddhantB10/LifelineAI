import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { demoAmbulances, demoEmergencies, demoHospitals } from '../data/demo';
import { GlassCard } from './GlassCard';

export function EmergencyMap() {
  const emergency = demoEmergencies[0];
  const ambulance = demoAmbulances[0];
  const hospital = demoHospitals[0];

  // Show placeholder if no demo data available
  if (!emergency || !ambulance || !hospital) {
    return (
      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-[var(--border)] px-5 py-4">
          <p className="text-sm font-semibold text-[var(--text)]">Live Emergency Map</p>
          <p className="text-xs text-[var(--muted)]">Tracking ambulance, patient, and hospital routing in real time</p>
        </div>
        <div className="flex h-[360px] items-center justify-center bg-[var(--card-strong)] md:h-[460px]">
          <div className="text-center">
            <div className="mb-2 text-[var(--muted)]">No active emergencies</div>
            <p className="text-xs text-[var(--muted)]">Map will display live emergency tracking when incidents are reported</p>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="border-b border-[var(--border)] px-5 py-4">
        <p className="text-sm font-semibold text-[var(--text)]">Live Emergency Map</p>
        <p className="text-xs text-[var(--muted)]">Tracking ambulance, patient, and hospital routing in real time</p>
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
