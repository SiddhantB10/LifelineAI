import { NavLink, Outlet } from 'react-router-dom';
import { Bell, LogOut, Map, Shield, Stethoscope, Truck, UserCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';

const dashboards = [
  { to: '/app/citizen', label: 'Citizen', icon: UserCircle2 },
  { to: '/app/driver', label: 'Driver', icon: Truck },
  { to: '/app/hospital', label: 'Hospital', icon: Stethoscope },
  { to: '/app/operator', label: 'Operator', icon: Map },
  { to: '/app/admin', label: 'Admin', icon: Shield },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-white/10 bg-slate-950/90 px-4 py-5 backdrop-blur-xl lg:min-h-screen lg:w-80 lg:border-b-0 lg:border-r lg:px-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/20">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-[0.26em]">LIFELINE AI</div>
              <div className="text-xs text-slate-400">Command center</div>
            </div>
          </div>

          <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Signed in as</p>
            <p className="mt-2 text-lg font-semibold text-white">{user?.name ?? 'Operator'}</p>
            <p className="text-sm text-slate-400">{user?.role ?? 'citizen'}</p>
          </div>

          <nav className="space-y-2">
            {dashboards.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-white/5',
                      isActive ? 'bg-red-500/15 text-white ring-1 ring-red-500/25' : 'text-slate-300',
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <button onClick={logout} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>

        <div className="flex-1 overflow-hidden">
          <header className="flex items-center justify-between border-b border-white/10 bg-slate-950/70 px-4 py-4 backdrop-blur-xl md:px-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Emergency Operations</p>
              <h1 className="text-xl font-semibold text-white md:text-2xl">Live command and response intelligence</h1>
            </div>
            <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300">System online</div>
          </header>

          <main className="scrollbar-thin overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
