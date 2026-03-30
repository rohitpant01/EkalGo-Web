/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ocean: {
          50: '#E8F4FD',
          100: '#C8E6F8',
          200: '#90CCF1',
          300: '#58B3EA',
          400: '#2099E3',
          500: '#0A7FDC',
          600: '#0866B0',
          700: '#064C84',
          800: '#043358',
          900: '#021A2C',
          950: '#010D16',
        },
        sand: {
          50: '#FDF8F0',
          100: '#FAF0DC',
          200: '#F5E1B9',
          300: '#EFD196',
          400: '#EAC273',
          500: '#E4B250',
          600: '#C9922A',
          700: '#9A6F20',
          800: '#6B4C16',
          900: '#3C2A0C',
        },
        teal: {
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
        ember: '#FF6B35',
        jade: '#2ECC71',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #021A2C 0%, #043358 40%, #0A4F6E 70%, #0D6B8C 100%)',
        'card-gradient': 'linear-gradient(180deg, transparent 0%, rgba(2,26,44,0.85) 100%)',
        'amber-gradient': 'linear-gradient(135deg, #E4B250 0%, #FF6B35 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
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
      },
      boxShadow: {
        'glow': '0 0 40px rgba(14, 165, 233, 0.3)',
        'glow-amber': '0 0 40px rgba(228, 178, 80, 0.4)',
        'card': '0 8px 32px rgba(2, 26, 44, 0.4)',
        'card-hover': '0 20px 60px rgba(2, 26, 44, 0.6)',
      },
    },
  },
  plugins: [],
}
