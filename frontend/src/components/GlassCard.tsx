import { cn } from '../utils/cn';
import type { ReactNode } from 'react';

export function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('glass-card rounded-3xl p-5 md:p-6', className)}>{children}</div>;
}
