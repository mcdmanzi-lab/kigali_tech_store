/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // include devtool overlay CSS so Tailwind generates utilities used there
    "./node_modules/vite-plugin-vue-devtools/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        // Provide gray palette for Tailwind v4 compatibility
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Rwanda flag inspired colors
        primary: {
          light: '#FFE700', // Yellow
          DEFAULT: '#FFD700',
          dark: '#FFA500',
        },
        secondary: {
          light: '#00D084', // Green
          DEFAULT: '#00B854',
          dark: '#008C45',
        },
        accent: {
          light: '#E8F5E9',
          DEFAULT: '#4CAF50',
          dark: '#1B5E20',
        },
        'kigali-blue': {
          light: '#E3F2FD',
          DEFAULT: '#1976D2',
          dark: '#1565C0',
        },
        'kigali-red': '#E53935',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
