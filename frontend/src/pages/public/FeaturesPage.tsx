import { ShieldCheck, Siren, BrainCircuit, MapPinned, BellRing, Radar } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { SectionHeading } from '../../components/SectionHeading';

const features = [
  { icon: Siren, title: 'One-tap SOS', description: 'Instant incident capture with geolocation, media upload, and emergency categorization.' },
  { icon: BrainCircuit, title: 'Emergency AI', description: 'Severity scoring, fake report detection, and routing intelligence tuned for urgency.' },
  { icon: MapPinned, title: 'Live routing', description: 'Patient, ambulance, and hospital routing with ETA and route-line updates.' },
  { icon: BellRing, title: 'Family alerts', description: 'Push, email, and messaging updates for relatives and nominated contacts.' },
  { icon: ShieldCheck, title: 'Role control', description: 'Citizen, driver, hospital, operator, and admin views with scoped actions.' },
  { icon: Radar, title: 'Hotspot analytics', description: 'Understand accident clusters, response delay trends, and city overload patterns.' },
];

export function FeaturesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <SectionHeading eyebrow="Platform features" title="Everything a city needs to respond fast" description="Designed as a premium operations platform, not a basic emergency form." />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <GlassCard key={feature.title}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15 text-red-200">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
