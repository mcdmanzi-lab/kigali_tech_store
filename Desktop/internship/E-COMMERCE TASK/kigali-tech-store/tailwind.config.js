/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
