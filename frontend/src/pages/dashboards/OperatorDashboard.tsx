import { GlassCard } from '../../components/GlassCard';
import { EmergencyMap } from '../../components/EmergencyMap';
import { demoEmergencies } from '../../data/demo';

export function OperatorDashboard() {
  return (
    <div className="space-y-5">
      <GlassCard>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">City emergencies</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {demoEmergencies.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-white">{item.type}</span>
                <span className="text-xs text-slate-400">{item.severity}</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </GlassCard>
      <EmergencyMap />
    </div>
  );
}
