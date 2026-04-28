import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lifeline: {
          red: '#ef4444',
          deep: '#081223',
          navy: '#0b1f3a',
          mist: '#dbeafe',
          steel: '#94a3b8',
        },
      },
      boxShadow: {
        glass: '0 20px 80px rgba(8, 18, 35, 0.28)',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseRoute: {
          '0%': { strokeDashoffset: '120' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        floatSlow: 'floatSlow 8s ease-in-out infinite',
        pulseRoute: 'pulseRoute 2.8s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
