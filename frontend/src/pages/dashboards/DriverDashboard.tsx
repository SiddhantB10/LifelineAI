import { useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { demoAmbulances, demoEmergencies } from '../../data/demo';
import { useInterval } from '../../hooks/useInterval';

export function DriverDashboard() {
  const active = demoEmergencies[0];
  const ambulance = demoAmbulances[0];
  const [gpsBeat, setGpsBeat] = useState(0);

  useInterval(() => {
    setGpsBeat((current) => current + 1);
  }, 5000);

  return (
    <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
      <GlassCard>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">New request</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">{active.type}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{active.description}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">ETA to patient: {active.etaMinutes} min</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">Assigned ambulance: {ambulance.name}</div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <PrimaryButton>Accept request</PrimaryButton>
          <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">Navigate</button>
        </div>
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
