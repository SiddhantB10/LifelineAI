import { NavLink, Outlet } from 'react-router-dom';
import { Ambulance, Menu, X, ShieldPlus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../utils/cn';
import { ThemeToggle } from '../components/ThemeToggle';

const navItems = [
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function PublicLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <div className="noise-overlay pointer-events-none absolute inset-0" />
      <div className="grid-glow pointer-events-none absolute inset-0 opacity-30" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-soft)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-responsive-sm px-responsive-sm py-responsive-sm md:px-responsive-md md:py-responsive-md">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-responsive-sm flex-shrink-0">
            <span className="flex h-9 w-9 xs:h-10 xs:w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/20">
              <Ambulance className="h-4 w-4 xs:h-5 xs:w-5 theme-inverse" />
            </span>
            <div className="hidden xs:block">
              <div className="text-xs xs:text-sm font-semibold tracking-[0.24em] text-[var(--text)]">LIFELINE AI</div>
              <div className="hidden text-xs text-[var(--muted)] sm:block">Emergency response intelligence</div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                className={({ isActive }) => cn('text-xs xl:text-sm text-[var(--muted)] transition hover:text-[var(--text)]', isActive && 'text-[var(--text)]')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-responsive-sm">
            <ThemeToggle />
            <NavLink to="/login" className="rounded-full border border-[var(--border)] px-3 xs:px-4 py-2 text-xs xs:text-sm text-[var(--text)] transition hover:bg-[var(--card-soft)]">
              Login
            </NavLink>
            <NavLink to="/signup" className="rounded-full bg-[var(--text)] px-3 xs:px-4 py-2 text-xs xs:text-sm font-semibold text-[var(--inverse-text)] transition hover:opacity-90">
              Get Started
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setOpen((value) => !value)} 
            className="inline-flex h-10 w-10 lg:hidden items-center justify-center rounded-2xl border border-[var(--border)] text-[var(--text)] transition hover:bg-[var(--card-soft)]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn('lg:hidden transition-all duration-300', open ? 'block' : 'hidden')}>
          <div className="mx-responsive-sm mb-responsive-sm space-y-2 rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] p-responsive-sm backdrop-blur-xl md:mx-responsive-md md:mb-responsive-md md:p-responsive-md">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                className="block rounded-2xl px-3 py-2 xs:py-3 text-xs xs:text-sm text-[var(--text)] hover:bg-[var(--card-soft)] transition" 
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
              <ThemeToggle className="w-full justify-center" />
              <NavLink 
                to="/login" 
                className="block rounded-2xl px-3 py-2 xs:py-3 text-xs xs:text-sm text-center text-[var(--text)] hover:bg-[var(--card-soft)] transition" 
                onClick={() => setOpen(false)}
              >
                Login
              </NavLink>
              <NavLink 
                to="/signup" 
                className="block rounded-2xl px-3 py-2 xs:py-3 text-xs xs:text-sm text-center bg-[var(--text)] text-[var(--inverse-text)] font-semibold hover:opacity-90 transition" 
                onClick={() => setOpen(false)}
              >
                Get Started
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--bg-soft)] px-responsive-sm py-responsive-md md:px-responsive-md md:py-responsive-lg">
        <div className="mx-auto grid max-w-7xl gap-responsive-md md:gap-responsive-lg grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
          {/* Branding Column */}
          <div>
            <div className="mb-3 flex items-center gap-2 xs:gap-3 text-[var(--text)]">
              <ShieldPlus className="h-4 w-4 xs:h-5 xs:w-5 text-red-400" />
              <span className="text-xs xs:text-sm font-semibold tracking-[0.28em]">LIFELINE AI</span>
            </div>
            <p className="max-w-lg text-xs xs:text-sm leading-6 xs:leading-7 text-[var(--muted)]">A premium emergency response platform for citizens, drivers, hospitals, and city command centers.</p>
          </div>

          {/* Product Links */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--text)]">Product</p>
            <div className="space-y-2 text-xs xs:text-sm text-[var(--muted)]">
              <NavLink className="block hover:text-[var(--text)] transition" to="/features">Features</NavLink>
              <NavLink className="block hover:text-[var(--text)] transition" to="/how-it-works">How It Works</NavLink>
              <NavLink className="block hover:text-[var(--text)] transition" to="/login">Dashboard Access</NavLink>
            </div>
          </div>

          {/* Emergency Modes */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--text)]">Emergency modes</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Accident', 'Heart Attack', 'Fire', 'Pregnancy', 'Trauma'].map((label) => (
                <span key={label} className="rounded-full border border-[var(--border)] bg-[var(--card-soft)] px-2 xs:px-3 py-1 xs:py-1.5 text-[var(--text)]">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mx-auto mt-responsive-md md:mt-responsive-lg max-w-7xl border-t border-[var(--border)] pt-responsive-sm text-xs text-[var(--muted)]">
          <p>&copy; 2024 Lifeline AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
