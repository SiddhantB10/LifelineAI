import { GlassCard } from './GlassCard';

export function StatCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="transform transition hover:-translate-y-1 hover:scale-[1.01]">
      <GlassCard className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-red-500/5" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">{label}</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <span className="text-3xl font-semibold text-[var(--text)]">{value}</span>
            <span className="shrink-0 whitespace-nowrap rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              {delta}
            </span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
