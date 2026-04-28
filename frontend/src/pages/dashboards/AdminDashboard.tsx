import { BarChart3, MapPinned, TriangleAlert, Users } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { SectionHeading } from '../../components/SectionHeading';
import { demoAmbulances, demoEmergencies, demoHospitals } from '../../data/demo';

const metrics = [
  { label: 'Response time', value: '4.8 min', icon: BarChart3 },
  { label: 'Active ambulances', value: `${demoAmbulances.length}`, icon: MapPinned },
  { label: 'Critical load', value: `${demoEmergencies.filter((item) => item.severity === 'Critical').length}`, icon: TriangleAlert },
  { label: 'Connected users', value: '12,408', icon: Users },
];

export function AdminDashboard() {
  return (
    <div>
      <SectionHeading eyebrow="Government command center" title="City-wide operational intelligence" description="Designed for municipal oversight, policy teams, and smart city emergency response coordination." />
      <div className="mt-8 grid gap-5 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <GlassCard key={metric.label}>
              <Icon className="h-5 w-5 text-red-300" />
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-400">{metric.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{metric.value}</p>
            </GlassCard>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Accident heatmap summary</p>
          <div className="mt-4 h-80 rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_35%_35%,rgba(239,68,68,0.28),transparent_18%),radial-gradient(circle_at_60%_55%,rgba(251,191,36,0.18),transparent_16%),linear-gradient(180deg,rgba(15,23,42,0.9),rgba(8,18,35,0.8))]">
            <div className="flex h-full items-center justify-center text-sm text-slate-300">Hotspot prediction map</div>
          </div>
        </GlassCard>

        <div className="space-y-5">
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Hospital status</p>
            <div className="mt-4 space-y-3">
              {demoHospitals.map((hospital) => (
                <div key={hospital.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-white">{hospital.name}</span>
                    <span className="text-xs text-slate-400">Load {hospital.load}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400" style={{ width: `${hospital.load}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
