/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Inter"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          900: '#0B0F1A', // Primary Background
          800: '#141829', // Slightly lighter panel
          accent: '#F5B942', // Warm yellow/gold
          neon: '#0EA5E9', // Neon blue
          teal: '#14B8A6', // Teal glow
        },
        ocean: { // Keeping these for compatibility
          50: '#E8F4FD', 100: '#C8E6F8', 200: '#90CCF1', 300: '#58B3EA',
          400: '#2099E3', 500: '#0A7FDC', 600: '#0866B0', 700: '#064C84',
          800: '#043358', 900: '#021A2C', 950: '#010D16',
        },
        sand: {
          50: '#FDF8F0', 100: '#FAF0DC', 200: '#F5E1B9', 300: '#EFD196',
          400: '#EAC273', 500: '#E4B250', 600: '#C9922A', 700: '#9A6F20',
          800: '#6B4C16', 900: '#3C2A0C',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0B0F1A 0%, #050811 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F5B942 0%, #FF9500 100%)',
        'glass': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      },
      boxShadow: {
        'glow-neon': '0 0 40px rgba(14, 165, 233, 0.4)',
        'glow-gold': '0 0 30px rgba(245, 185, 66, 0.5)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}
