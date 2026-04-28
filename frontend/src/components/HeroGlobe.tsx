export function HeroGlobe() {
  return (
    <div className="relative flex h-[360px] items-center justify-center overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.12),transparent_55%)]" />
      <svg className="w-56 h-56" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#g)" opacity="0.95" />
        <g stroke="rgba(255,255,255,0.12)" strokeWidth="0.8">
          <circle cx="100" cy="100" r="40" fill="none" />
          <path d="M20 100h160" />
          <path d="M100 20v160" />
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-x-8 bottom-6 rounded-2xl border border-[var(--border)] bg-[var(--card-strong)] p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between text-xs text-[var(--text)]">
          <span>Emergency Network Pulse</span>
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 font-medium text-emerald-300">92% coverage</span>
        </div>
      </div>
    </div>
  );
}
