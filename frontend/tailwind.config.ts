import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
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
      spacing: {
        'responsive-xs': 'clamp(0.5rem, 2vw, 1rem)',
        'responsive-sm': 'clamp(1rem, 3vw, 1.5rem)',
        'responsive-md': 'clamp(1.5rem, 4vw, 2rem)',
        'responsive-lg': 'clamp(2rem, 5vw, 3rem)',
        'responsive-xl': 'clamp(2.5rem, 6vw, 4rem)',
      },
      fontSize: {
        'responsive-xs': 'clamp(0.625rem, 1.5vw, 0.75rem)',
        'responsive-sm': 'clamp(0.75rem, 2vw, 0.875rem)',
        'responsive-base': 'clamp(0.875rem, 2.5vw, 1rem)',
        'responsive-lg': 'clamp(1rem, 3vw, 1.125rem)',
        'responsive-xl': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'responsive-2xl': 'clamp(1.5rem, 4vw, 1.875rem)',
        'responsive-3xl': 'clamp(1.875rem, 5vw, 2.25rem)',
        'responsive-4xl': 'clamp(2.25rem, 6vw, 3rem)',
        'responsive-5xl': 'clamp(3rem, 7vw, 3.75rem)',
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
