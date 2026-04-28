import { NavLink, Outlet } from 'react-router-dom';
import { Bell, LogOut, Map, Shield, Stethoscope, Truck, UserCircle2, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { cn } from '../utils/cn';
import { ThemeToggle } from '../components/ThemeToggle';

const dashboards = [
  { to: '/app/citizen', label: 'Citizen', icon: UserCircle2 },
  { to: '/app/driver', label: 'Driver', icon: Truck },
  { to: '/app/hospital', label: 'Hospital', icon: Stethoscope },
  { to: '/app/operator', label: 'Operator', icon: Map },
  { to: '/app/admin', label: 'Admin', icon: Shield },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className={cn(
          'fixed inset-y-0 left-0 z-40 w-full xs:w-80 md:w-96 border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--bg-soft)] px-responsive-sm py-responsive-sm backdrop-blur-xl transition-transform duration-300 lg:static lg:min-h-screen lg:w-64 xl:w-72 2xl:w-80 3xl:w-96 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          {/* Close Button on Mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-responsive-sm right-responsive-sm lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Logo */}
          <div className="mb-responsive-md lg:mb-responsive-md flex items-center gap-responsive-sm">
            <div className="flex h-10 w-10 xs:h-12 xs:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/20">
              <Bell className="h-4 w-4 xs:h-5 xs:w-5 theme-inverse" />
            </div>
            <div>
              <div className="text-xs xs:text-sm font-semibold tracking-[0.26em]">LIFELINE AI</div>
              <div className="text-xs text-[var(--muted)]">Command center</div>
            </div>
          </div>

          {/* User Info Card */}
          <div className="mb-responsive-md rounded-3xl border border-[var(--border)] bg-[var(--card-soft)] p-responsive-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Signed in as</p>
            <p className="mt-2 truncate text-lg xs:text-xl font-semibold text-[var(--text)]">{user?.name ?? 'Operator'}</p>
            <p className="text-xs xs:text-sm capitalize text-[var(--muted)]">{user?.role ?? 'citizen'}</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-responsive-md max-h-[calc(100vh-300px)] overflow-y-auto">
            {dashboards.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-responsive-sm rounded-2xl px-responsive-sm py-responsive-sm text-xs xs:text-sm transition whitespace-nowrap',
                      isActive ? 'bg-red-500/15 text-[var(--text)] ring-1 ring-red-500/25' : 'text-[var(--muted)] hover:bg-[var(--card-soft)]',
                    )
                  }
                >
                  <Icon className="h-4 w-4 xs:h-5 xs:w-5 flex-shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button 
            onClick={logout} 
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] px-responsive-sm py-responsive-sm text-xs xs:text-sm text-[var(--text)] transition hover:bg-[var(--card-strong)]"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col w-full">
          {/* Header */}
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-soft)] px-responsive-sm py-responsive-sm backdrop-blur-xl md:px-responsive-md md:py-responsive-md">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] text-[var(--text)] hover:bg-[var(--card-soft)]"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Title */}
            <div className="flex-1 ml-responsive-sm lg:ml-0">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Emergency Operations</p>
              <h1 className="text-base xs:text-xl lg:text-2xl 3xl:text-3xl font-semibold text-[var(--text)]">Live command and response intelligence</h1>
            </div>

            {/* Status Badge */}
            <div className="ml-responsive-sm rounded-full border border-emerald-400/20 bg-emerald-500/10 px-responsive-sm py-2 text-xs xs:text-sm font-medium whitespace-nowrap text-emerald-300">
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <span>System online</span>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="scrollbar-thin overflow-y-auto flex-1 p-responsive-sm md:p-responsive-md lg:p-responsive-lg">
            <Outlet />
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
