import { useState } from 'react';
import { Mic, Upload, HeartPulse, MapPin, BellRing, FileClock } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { demoEmergencies } from '../../data/demo';
import { useInterval } from '../../hooks/useInterval';

const emergencyTypes = ['Accident', 'Heart Attack', 'Fire', 'Trauma', 'Pregnancy', 'Other'];

export function CitizenDashboard() {
  const [selected, setSelected] = useState('Heart Attack');
  const [etaMinutes, setEtaMinutes] = useState(4);

  useInterval(() => {
    setEtaMinutes((current) => (current > 1 ? current - 1 : 1));
  }, 6000);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-5">
        <GlassCard>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Emergency SOS</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Fastest path to help</h2>
            </div>
            <button className="animate-pulse rounded-full bg-red-500 px-6 py-6 text-lg font-semibold text-white shadow-2xl shadow-red-500/30">SOS</button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {emergencyTypes.map((type) => (
              <button key={type} onClick={() => setSelected(type)} className={selected === type ? 'rounded-2xl border border-red-400/30 bg-red-500/15 px-4 py-3 text-left text-white' : 'rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-slate-300'}>
                {type}
              </button>
            ))}
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"><MapPin className="mb-2 h-4 w-4 text-red-300" />Auto geolocation enabled</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"><Mic className="mb-2 h-4 w-4 text-red-300" />Voice request ready</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"><Upload className="mb-2 h-4 w-4 text-red-300" />Media upload supported</div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton>Send SOS</PrimaryButton>
            <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">Notify family</button>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Live tracking</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Ambulance ETA {etaMinutes} min</h3>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">Assigned</span>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-red-500 to-orange-400" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"><HeartPulse className="mb-2 h-4 w-4 text-red-300" />Severity: Critical</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"><BellRing className="mb-2 h-4 w-4 text-red-300" />Family notifications active</div>
          </div>
        </GlassCard>
      </div>

      <div className="space-y-5">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Medical profile</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ['Blood group', 'O+'],
              ['Allergies', 'Penicillin'],
              ['Age', '34'],
              ['Known conditions', 'Hypertension'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Recent history</p>
          <div className="mt-4 space-y-3">
            {demoEmergencies.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-white">{item.type}</span>
                  <span className="text-xs text-slate-400">{item.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
