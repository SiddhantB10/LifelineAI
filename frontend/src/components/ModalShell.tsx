import { X } from 'lucide-react';
import { GlassCard } from './GlassCard';
import type { ReactNode } from 'react';

export function ModalShell({ title, subtitle, onClose, children }: { title: string; subtitle?: string; onClose?: () => void; children: ReactNode }) {
  return (
    <GlassCard className="relative">
      {onClose ? (
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      ) : null}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      {children}
    </GlassCard>
  );
}
