import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Role } from '../types';

const roleOptions: Array<{ value: Role; label: string }> = [
  { value: 'citizen', label: 'Citizen' },
  { value: 'driver', label: 'Ambulance Driver' },
  { value: 'hospital', label: 'Hospital Staff' },
  { value: 'operator', label: 'Emergency Operator' },
  { value: 'admin', label: 'Government Admin' },
];

interface RoleSelectProps {
  value: Role;
  onChange: (role: Role) => void;
}

export function RoleSelect({ value, onChange }: RoleSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const selected = roleOptions.find((option) => option.value === value) ?? roleOptions[0];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-left text-white outline-none transition hover:border-white/20"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected.label}</span>
        <ChevronDown className={`h-4 w-4 text-slate-300 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-white/10 bg-slate-900 p-1 shadow-[0_8px_30px_rgb(0,0,0,0.8)]"
        >
          {roleOptions.map((option) => {
            const isActive = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}