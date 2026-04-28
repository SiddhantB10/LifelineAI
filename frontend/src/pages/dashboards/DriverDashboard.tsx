import { useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { demoAmbulances, demoEmergencies } from '../../data/demo';
import { useInterval } from '../../hooks/useInterval';

export function DriverDashboard() {
  const active = demoEmergencies.length > 0 ? demoEmergencies[0] : null;
  const ambulance = demoAmbulances.length > 0 ? demoAmbulances[0] : null;
  const [gpsBeat, setGpsBeat] = useState(0);

  useInterval(() => {
    setGpsBeat((current) => current + 1);
  }, 5000);

  return (
    <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
      <GlassCard>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">New request</p>
        {active && ambulance ? (
          <>
            <h2 className="mt-3 text-responsive-2xl xs:text-responsive-3xl font-semibold text-white">{active.type}</h2>
            <p className="mt-3 text-xs xs:text-sm leading-6 text-slate-300">{active.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-responsive-sm text-xs xs:text-sm text-slate-300">ETA to patient: {active.etaMinutes} min</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-responsive-sm text-xs xs:text-sm text-slate-300">Assigned ambulance: {ambulance.name}</div>
            </div>
            <div className="mt-5 flex flex-wrap gap-responsive-sm">
              <PrimaryButton>Accept request</PrimaryButton>
              <button className="rounded-full border border-white/10 bg-white/5 px-4 xs:px-5 py-2 xs:py-3 text-xs xs:text-sm font-semibold text-white">Navigate</button>
            </div>
          </>
        ) : (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-responsive-md text-center text-slate-400">
            <p className="text-sm">No active requests at the moment. Waiting for emergency dispatch...</p>
          </div>
        )}
      </GlassCard>

      <div className="grid gap-5">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Status update</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {['Accepted', 'Reached Pickup', 'Patient Onboard', 'Reached Hospital', 'Completed'].map((status) => (
              <button key={status} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-red-500/10">
                {status}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Live GPS heartbeat</p>
          <div className="mt-4 h-56 rounded-3xl border border-dashed border-red-500/30 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.16),transparent_60%)]">
            <div className="flex h-full flex-col items-center justify-center text-sm text-slate-300">
              <span>GPS coordinates streaming every few seconds</span>
              <span className="mt-2 text-xs text-red-200">Heartbeat tick {gpsBeat}</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
