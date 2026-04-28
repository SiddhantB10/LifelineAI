import { ArrowRight, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { demoStats, dashboardModules } from '../../data/demo';
import { EmergencyMap } from '../../components/EmergencyMap';
import { HeroGlobe } from '../../components/HeroGlobe';
import { GlassCard } from '../../components/GlassCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SectionHeading } from '../../components/SectionHeading';
import { StatCard } from '../../components/StatCard';

const testimonials = [
  { name: 'Dr. Meera Iyer', role: 'Hospital emergency lead', quote: 'LIFELINE AI compresses the golden hour into a controlled workflow.' },
  { name: 'Rohit Jain', role: 'City operator', quote: 'The dispatch and routing view makes overloaded incidents instantly manageable.' },
  { name: 'Ananya Rao', role: 'Citizen safety advocate', quote: 'The family alert flow and multilingual SOS are exactly what cities need.' },
];

export function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-red-200">
              <Sparkles className="h-4 w-4" />
              Emergency response intelligence
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">Smart emergency response for the golden hour.</h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">LIFELINE AI connects citizens, ambulances, hospitals, and city operators in one life-saving network with live tracking, AI severity analysis, and intelligent hospital routing.</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <NavLink to="/signup">
                <PrimaryButton>Launch Demo <ArrowRight className="h-4 w-4" /></PrimaryButton>
              </NavLink>
              <NavLink to="/features" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Explore features
              </NavLink>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {demoStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <HeroGlobe />
            <GlassCard className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-blue-500/10" />
              <div className="relative grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Operator overview</p>
                  <div className="mt-3 text-3xl font-semibold text-white">16 active emergencies</div>
                  <p className="mt-2 text-sm text-slate-300">Critical incidents are automatically prioritized by severity, distance, and specialty availability.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Next ambulance ETA</span>
                    <span className="text-emerald-300">4 min</span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-red-500 to-orange-400" />
                  </div>
                  <p className="mt-3 text-sm text-slate-300">Route optimization and hospital matching are re-evaluated every few seconds.</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 md:px-6 md:pb-10">
        <EmergencyMap />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionHeading
          eyebrow="Why LIFELINE AI matters"
          title="Built to remove the delays that cost lives"
          description="Every interaction is designed around urgency: one-tap SOS, live ETA updates, family notifications, hospital load checks, and municipal-level analytics."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(dashboardModules).map(([role, modules]) => (
            <GlassCard key={role}>
              <p className="text-xs uppercase tracking-[0.3em] text-red-300/80">{role}</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {modules.map((module) => (
                  <li key={module} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    {module}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <GlassCard key={item.name}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/15 text-red-200">{item.name.slice(0, 1)}</div>
                <div>
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-xs text-slate-400">{item.role}</div>
                </div>
              </div>
              <p className="text-sm leading-7 text-slate-300">“{item.quote}”</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <GlassCard className="overflow-hidden">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-red-300/80">Smart city readiness</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">Command centers, hospitals, and ambulances sharing one response fabric.</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Use the platform to reduce arrival time, improve triage, detect hotspots, and keep families informed from the first alert to hospital handoff.</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-start md:justify-end">
              {['AI severity', 'Live GPS', 'Hospital load', 'Family alerts', 'Hotspot heatmap'].map((label) => (
                <span key={label} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">{label}</span>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
