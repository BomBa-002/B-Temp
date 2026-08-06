import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(40 0% 4%)',
        foreground: 'hsl(40 0% 94%)',
        primary: 'hsl(40 80% 60%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
