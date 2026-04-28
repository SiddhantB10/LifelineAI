import { GlassCard } from '../../components/GlassCard';
import { demoEmergencies, demoHospitals } from '../../data/demo';

export function HospitalDashboard() {
  const hospital = demoHospitals[0];

  return (
    <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
      <GlassCard>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Incoming cases</p>
        <div className="mt-4 space-y-3">
          {demoEmergencies.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-white">{item.type}</span>
                <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-200">{item.severity}</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">ETA {item.etaMinutes} min · {item.status}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid gap-5">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Beds management</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">{hospital.name}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">ICU beds: {hospital.icu_beds}</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">Emergency beds: {hospital.emergency_beds}</div>
          </div>
        </GlassCard>

        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Specialty alerts</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {hospital.specialties.map((specialty) => (
              <span key={specialty} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
                {specialty}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
