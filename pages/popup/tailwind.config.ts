import baseConfig from '@extension/tailwindcss-config';
import { withUI } from '@extension/ui';

export default withUI({
  ...baseConfig,
  content: ['./src/**/*.{ts,tsx}'],
  safelist: ['text-gray-800', 'bg-gray-300', 'opacity-50'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        font: 'var(--font-color)',
        bg: 'var(--bg-color)',
        heading: 'var(--heading-color)',
      },
      fontSize: {
        base: 'var(--font-size)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
});
