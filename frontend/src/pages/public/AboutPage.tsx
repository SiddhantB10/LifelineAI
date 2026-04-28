import { GlassCard } from '../../components/GlassCard';
import { SectionHeading } from '../../components/SectionHeading';

export function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <SectionHeading eyebrow="About" title="Built for municipalities, hospitals, and real emergencies" description="The product combines emergency UX, operational dashboards, and routing intelligence to make response faster and more visible." />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <GlassCard>
          <h3 className="text-xl font-semibold text-white">Mission</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">Remove avoidable delay from accident and medical response by connecting every stakeholder to the same truth in real time.</p>
        </GlassCard>
        <GlassCard>
          <h3 className="text-xl font-semibold text-white">Design direction</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">Serious, premium, and operational. The interface uses glassmorphism, high contrast, and subtle motion to communicate urgency clearly.</p>
        </GlassCard>
      </div>
    </div>
  );
}
