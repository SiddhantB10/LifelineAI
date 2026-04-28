import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-soft)] px-3 py-2 text-xs xs:text-sm font-semibold text-[var(--text)] transition hover:-translate-y-0.5 hover:bg-[var(--card-strong)]',
        className,
      )}
    >
      {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}