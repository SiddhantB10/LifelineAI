import { GlassCard } from '../../components/GlassCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SectionHeading } from '../../components/SectionHeading';

export function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <SectionHeading eyebrow="Contact" title="Talk to the response platform team" description="Use the form below for partnerships, pilots, and municipal deployments." />
      <GlassCard className="mt-10">
        <div className="grid gap-4 md:grid-cols-2">
          <input placeholder="Name" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500" />
          <input placeholder="Organization" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500" />
          <input placeholder="Email" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500" />
          <input placeholder="Phone" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500" />
          <textarea placeholder="Project details" className="min-h-40 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500 md:col-span-2" />
        </div>
        <div className="mt-5">
          <PrimaryButton type="button">Send inquiry</PrimaryButton>
        </div>
      </GlassCard>
    </div>
  );
}
