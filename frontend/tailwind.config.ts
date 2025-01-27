import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        rollout200: {
          '0%': { 'max-height': '0', 'padding-block': '0' },
          '100%': {
            'max-height': '200px',
          },
        },
        appear: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        rollout200: 'rollout200 .5s ease-out',
        appear: 'appear .15s ease-out',
      },
      boxShadow: {
        base: '0px 4px 12px rgba(0, 0, 0, .1)',
      },
      fontFamily: {
        'roboto-condensed': [
          'Roboto Condensed',
          'Roboto',
          'Roboto Fallback',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
