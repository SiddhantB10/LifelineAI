import { GlassCard } from '../../components/GlassCard';
import { SectionHeading } from '../../components/SectionHeading';

const steps = [
  'Citizen raises SOS with geolocation, voice, and severity details.',
  'AI scores severity and dispatches the nearest available ambulance.',
  'Hospital matching engine selects a facility by specialty, ICU availability, and load.',
  'Family, hospital staff, and command center receive synchronized notifications.',
];

export function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <SectionHeading eyebrow="Process" title="A four-stage emergency workflow" description="Built to reduce confusion during the first minute of an incident." />
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {steps.map((step, index) => (
          <GlassCard key={step} className="flex gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-lg font-semibold text-red-200">
              {index + 1}
            </div>
            <p className="pt-2 text-sm leading-7 text-slate-300">{step}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
