import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// replaced react-hot-toast usage with window.alert to avoid removed dependency
import { GlassCard } from '../../components/GlassCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { RoleSelect } from '../../components/RoleSelect';
import { useAuth } from '../../context/AuthContext';
import type { Role } from '../../types';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('citizen');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await login(email, password, role);
      navigate(`/app/${role}`);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Login failed');
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 md:px-6 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-red-300/80">Access</p>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">Login to the emergency command layer</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">Use the demo role accounts to explore citizen, driver, hospital, operator, and admin experiences.</p>
      </div>
      <GlassCard>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <RoleSelect value={role} onChange={setRole} />
          <PrimaryButton type="submit" className="w-full">Login</PrimaryButton>
        </form>
      </GlassCard>
    </div>
  );
}
