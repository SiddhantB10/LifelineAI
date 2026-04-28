import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// replaced react-hot-toast usage with window.alert to avoid removed dependency
import { GlassCard } from '../../components/GlassCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { RoleSelect } from '../../components/RoleSelect';
import { useAuth } from '../../context/AuthContext';
import type { Role } from '../../types';

type SignupFormState = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
};

export function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState<SignupFormState>({ name: '', email: '', password: '', phone: '', role: 'citizen' });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await signup(form);
      navigate(`/app/${form.role}`);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Signup failed');
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 md:px-6 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-red-300/80">Create account</p>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">Set up your emergency profile</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">Profiles can store blood group, allergies, and role-specific access for response teams.</p>
      </div>
      <GlassCard>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'password', 'phone'].map((field) => (
            <input
              key={field}
              value={form[field as keyof typeof form]}
              onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
              type={field === 'password' ? 'password' : 'text'}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
            />
          ))}
          <RoleSelect value={form.role} onChange={(role) => setForm((current) => ({ ...current, role }))} />
          <PrimaryButton type="submit" className="w-full">Create account</PrimaryButton>
        </form>
      </GlassCard>
    </div>
  );
}
