import { GlassCard } from '../../components/GlassCard';
import { demoEmergencies, demoHospitals } from '../../data/demo';

export function HospitalDashboard() {
  const hospital = demoHospitals.length > 0 ? demoHospitals[0] : null;

  return (
    <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
      <GlassCard>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Incoming cases</p>
        <div className="mt-4 space-y-3">
          {demoEmergencies.length > 0 ? (
            demoEmergencies.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-responsive-sm">
                <div className="flex items-center justify-between gap-responsive-sm">
                  <span className="font-semibold text-white text-sm">{item.type}</span>
                  <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-200">{item.severity}</span>
                </div>
                <p className="mt-2 text-xs xs:text-sm text-slate-300">ETA {item.etaMinutes} min · {item.status}</p>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-responsive-md text-center text-slate-400">
              <p className="text-sm">No incoming cases at the moment</p>
            </div>
          )}
        </div>
      </GlassCard>

      <div className="grid gap-5">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Beds management</p>
          {hospital ? (
            <>
              <h2 className="mt-3 text-responsive-xl xs:text-responsive-2xl font-semibold text-white">{hospital.name}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-responsive-sm text-xs xs:text-sm text-slate-300">ICU beds: {hospital.icu_beds}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-responsive-sm text-xs xs:text-sm text-slate-300">Emergency beds: {hospital.emergency_beds}</div>
              </div>
            </>
          ) : (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-responsive-md text-center text-slate-400">
              <p className="text-sm">Hospital data will load when system is active</p>
            </div>
          )}
        </GlassCard>

        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Specialty alerts</p>
          {hospital && hospital.specialties?.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {hospital.specialties.map((specialty) => (
                <span key={specialty} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs xs:text-sm text-slate-200">
                  {specialty}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-400">No specialties configured</p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
