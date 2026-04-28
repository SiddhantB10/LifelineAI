import { NavLink, Outlet } from 'react-router-dom';
import { Ambulance, Menu, ShieldPlus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../utils/cn';

const navItems = [
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function PublicLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="noise-overlay pointer-events-none absolute inset-0" />
      <div className="grid-glow pointer-events-none absolute inset-0 opacity-30" />
      <header className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/20">
              <Ambulance className="h-5 w-5 text-white" />
            </span>
            <div>
              <div className="text-sm font-semibold tracking-[0.24em] text-white">LIFELINE AI</div>
              <div className="text-xs text-slate-400">Emergency response intelligence</div>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => cn('text-sm text-slate-300 transition hover:text-white', isActive && 'text-white')}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <NavLink to="/login" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5">
              Login
            </NavLink>
            <NavLink to="/signup" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
              Get Started
            </NavLink>
          </div>

          <button onClick={() => setOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-white lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className={cn('lg:hidden', open ? 'block' : 'hidden')}>
          <div className="mx-4 mb-4 space-y-2 rounded-3xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className="block rounded-2xl px-3 py-3 text-sm text-slate-200 hover:bg-white/5" onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/login" className="block rounded-2xl px-3 py-3 text-sm text-slate-200 hover:bg-white/5" onClick={() => setOpen(false)}>
              Login
            </NavLink>
          </div>
        </div>
      </header>

      <main className="relative z-20">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950/80 px-4 py-10 text-slate-400 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-3 text-white">
              <ShieldPlus className="h-5 w-5 text-red-400" />
              <span className="text-sm font-semibold tracking-[0.28em]">LIFELINE AI</span>
            </div>
            <p className="max-w-lg text-sm leading-7">A premium emergency response platform for citizens, drivers, hospitals, and city command centers.</p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Product</p>
            <div className="space-y-2 text-sm">
              <NavLink className="block hover:text-white" to="/features">Features</NavLink>
              <NavLink className="block hover:text-white" to="/how-it-works">How It Works</NavLink>
              <NavLink className="block hover:text-white" to="/login">Dashboard Access</NavLink>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Emergency modes</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Accident', 'Heart Attack', 'Fire', 'Pregnancy', 'Trauma'].map((label) => (
                <span key={label} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-200">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs text-slate-500">
          Built for life-saving response, municipal operations, and hackathon demo impact.
        </div>
      </footer>
    </div>
  );
}
