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
    <div className="bg-[var(--bg)] text-[var(--text)]">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-responsive-sm py-responsive-lg md:px-responsive-md md:py-responsive-xl">
        <div className="grid items-center gap-responsive-lg lg:gap-responsive-xl lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="mb-responsive-sm inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-responsive-sm py-2 text-xs xs:text-sm font-semibold uppercase tracking-[0.32em] text-red-200">
              <Sparkles className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
              <span>Emergency response intelligence</span>
            </div>

            <h1 className="mt-responsive-md text-responsive-4xl font-semibold tracking-tight text-[var(--text)] xs:text-responsive-5xl">
              Smart emergency response for the golden hour.
            </h1>

            <p className="mt-responsive-md max-w-2xl text-responsive-base leading-7 text-[var(--muted)] xs:text-responsive-lg xs:leading-8">
              LIFELINE AI connects citizens, ambulances, hospitals, and city operators in one life-saving network with live tracking, AI severity analysis, and intelligent hospital routing.
            </p>

            <div className="mt-responsive-lg flex flex-col xs:flex-row gap-responsive-sm xs:flex-wrap">
              <NavLink to="/signup">
                <PrimaryButton>Launch Demo <ArrowRight className="h-4 w-4" /></PrimaryButton>
              </NavLink>
              <NavLink to="/features" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-soft)] px-responsive-md py-responsive-sm text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-strong)] xs:justify-start xs:text-sm">
                Explore features
              </NavLink>
            </div>

            <div className="mt-responsive-lg grid gap-responsive-sm xs:gap-responsive-md sm:grid-cols-2 xl:grid-cols-4">
              {demoStats.length > 0 ? (
                demoStats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))
              ) : (
                <div className="col-span-full rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-responsive-md text-center text-[var(--muted)]">
                  <p className="text-sm">Real-time statistics will appear here once the system is live.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-responsive-md mx-auto w-full max-w-md lg:max-w-none">
            <HeroGlobe />
            <GlassCard className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-blue-500/10" />
              <div className="relative grid gap-responsive-sm md:gap-responsive-md md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Operator overview</p>
                  <div className="mt-responsive-sm text-2xl font-semibold text-[var(--text)] xs:text-3xl">16 active emergencies</div>
                  <p className="mt-responsive-sm text-xs text-[var(--muted)] xs:text-sm">Critical incidents are automatically prioritized by severity, distance, and specialty availability.</p>
                </div>
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--card-strong)] p-responsive-sm">
                  <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                    <span>Next ambulance ETA</span>
                    <span className="text-emerald-300 font-semibold">4 min</span>
                  </div>
                  <div className="mt-responsive-sm h-2 overflow-hidden rounded-full bg-[var(--card-soft)]">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-red-500 to-orange-400" />
                  </div>
                  <p className="mt-responsive-sm text-xs text-[var(--muted)] xs:text-sm">Route optimization and hospital matching are re-evaluated every few seconds.</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-responsive-sm py-responsive-md md:px-responsive-md md:py-responsive-lg">
        <EmergencyMap />
      </section>

      <section className="mx-auto max-w-7xl px-responsive-sm py-responsive-lg md:px-responsive-md md:py-responsive-xl">
        <SectionHeading
          eyebrow="Why LIFELINE AI matters"
          title="Built to remove the delays that cost lives"
          description="Every interaction is designed around urgency: one-tap SOS, live ETA updates, family notifications, hospital load checks, and municipal-level analytics."
        />
        <div className="mt-responsive-lg grid gap-responsive-md md:gap-responsive-lg md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {Object.entries(dashboardModules).map(([role, modules]) => (
            <GlassCard key={role}>
              <p className="text-xs uppercase tracking-[0.3em] text-red-300/80">{role}</p>
              <ul className="mt-responsive-md space-y-responsive-sm text-xs text-[var(--muted)] xs:text-sm">
                {modules.map((module) => (
                  <li key={module} className="flex items-start gap-responsive-sm">
                    <span className="h-2 w-2 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                    <span>{module}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-responsive-sm py-responsive-lg md:px-responsive-md md:py-responsive-xl">
        <div className="grid gap-responsive-md lg:gap-responsive-lg lg:grid-cols-3">
          {testimonials.map((item) => (
            <GlassCard key={item.name}>
              <div className="mb-responsive-md flex items-center gap-responsive-sm">
                <div className="flex h-10 w-10 xs:h-11 xs:w-11 items-center justify-center rounded-2xl bg-red-500/15 text-red-200 flex-shrink-0 text-sm xs:text-base font-semibold">
                  {item.name.slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-[var(--text)] xs:text-base">{item.name}</div>
                  <div className="truncate text-xs text-[var(--muted)]">{item.role}</div>
                </div>
              </div>
              <p className="text-xs leading-6 text-[var(--muted)] xs:text-sm xs:leading-7">"{item.quote}"</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-responsive-sm pb-responsive-xl md:px-responsive-md md:pb-responsive-xl">
        <GlassCard className="overflow-hidden">
          <div className="grid gap-responsive-md md:gap-responsive-lg md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-red-300/80">Smart city readiness</p>
              <h3 className="mt-responsive-sm text-responsive-2xl font-semibold text-[var(--text)] xs:text-responsive-3xl">
                Command centers, hospitals, and ambulances sharing one response fabric.
              </h3>
              <p className="mt-responsive-md max-w-2xl text-xs leading-6 text-[var(--muted)] xs:text-sm xs:leading-7">
                Use the platform to reduce arrival time, improve triage, detect hotspots, and keep families informed from the first alert to hospital handoff.
              </p>
            </div>
            <div className="flex flex-wrap gap-responsive-sm justify-start md:justify-end">
              {['AI severity', 'Live GPS', 'Hospital load', 'Family alerts', 'Hotspot heatmap'].map((label) => (
                <span key={label} className="rounded-full border border-[var(--border)] bg-[var(--card-soft)] px-responsive-sm py-2 text-xs text-[var(--text)] whitespace-nowrap xs:text-sm">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
