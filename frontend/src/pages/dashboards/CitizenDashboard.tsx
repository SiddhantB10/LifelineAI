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
    <div className="grid gap-responsive-md lg:gap-responsive-lg xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-responsive-md">
        <GlassCard>
          <div className="flex items-start justify-between gap-responsive-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Emergency SOS</p>
              <h2 className="mt-responsive-sm text-responsive-2xl xs:text-responsive-3xl font-semibold text-white">Fastest path to help</h2>
            </div>
            <button className="animate-pulse rounded-full bg-red-500 px-4 xs:px-6 py-4 xs:py-6 text-base xs:text-lg font-semibold text-white shadow-2xl shadow-red-500/30 flex-shrink-0">SOS</button>
          </div>
          <div className="mt-responsive-md grid gap-responsive-sm sm:grid-cols-2 xl:grid-cols-3">
            {emergencyTypes.map((type) => (
              <button 
                key={type} 
                onClick={() => setSelected(type)} 
                className={`rounded-2xl border px-responsive-sm py-responsive-sm text-left text-xs xs:text-sm transition ${
                  selected === type 
                    ? 'border-red-400/30 bg-red-500/15 text-white' 
                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="mt-responsive-md grid gap-responsive-sm md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-responsive-sm text-xs xs:text-sm text-slate-300">
              <MapPin className="mb-2 h-4 w-4 text-red-300" />
              Auto geolocation enabled
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-responsive-sm text-xs xs:text-sm text-slate-300">
              <Mic className="mb-2 h-4 w-4 text-red-300" />
              Voice request ready
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-responsive-sm text-xs xs:text-sm text-slate-300">
              <Upload className="mb-2 h-4 w-4 text-red-300" />
              Media upload supported
            </div>
          </div>
          <div className="mt-responsive-md flex flex-col xs:flex-row gap-responsive-sm">
            <PrimaryButton className="w-full xs:w-auto">Send SOS</PrimaryButton>
            <button className="rounded-full border border-white/10 bg-white/5 px-responsive-md py-responsive-sm text-xs xs:text-sm font-semibold text-white transition hover:bg-white/10">
              Notify family
            </button>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-responsive-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Live tracking</p>
              <h3 className="mt-responsive-sm text-responsive-xl xs:text-responsive-2xl font-semibold text-white">Ambulance ETA {etaMinutes} min</h3>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-responsive-sm py-1 text-xs font-medium text-emerald-300 whitespace-nowrap">Assigned</span>
          </div>
          <div className="mt-responsive-md h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-red-500 to-orange-400" />
          </div>
          <div className="mt-responsive-md grid gap-responsive-sm sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-responsive-sm text-xs xs:text-sm text-slate-300">
              <HeartPulse className="mb-2 h-4 w-4 text-red-300" />
              Severity: Critical
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-responsive-sm text-xs xs:text-sm text-slate-300">
              <BellRing className="mb-2 h-4 w-4 text-red-300" />
              Family notifications active
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="space-y-responsive-md">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Medical profile</p>
          <div className="mt-responsive-md grid gap-responsive-sm sm:grid-cols-2">
            {[
              ['Blood group', 'O+'],
              ['Allergies', 'Penicillin'],
              ['Age', '34'],
              ['Known conditions', 'Hypertension'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-responsive-sm">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-1 text-xs xs:text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Recent history</p>
          <div className="mt-responsive-md space-y-responsive-sm">
            {demoEmergencies.length > 0 ? (
              demoEmergencies.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-responsive-sm">
                  <div className="flex items-center justify-between gap-responsive-sm">
                    <span className="font-semibold text-white text-xs xs:text-sm">{item.type}</span>
                    <span className="text-xs text-slate-400">{item.status}</span>
                  </div>
                  <p className="mt-2 text-xs xs:text-sm text-slate-300">{item.description}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-responsive-md text-center text-slate-400">
                <p className="text-xs xs:text-sm">No emergency history yet</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
