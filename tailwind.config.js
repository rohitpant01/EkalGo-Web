/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        primary: {
          50:  '#EFFEFA',
          100: '#C6FFF2',
          200: '#8DFEE6',
          300: '#4DF5D6',
          400: '#2DD4BF', // Logo teal — main primary
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        accent: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#F5B942', // Logo amber/gold
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F8FAFB',
          dark: '#F1F5F9',
          hover: '#F0FDFA',
        },
        dark: {
          DEFAULT: '#0F172A',
          surface: '#1E293B',
          muted: '#334155',
        },
        // Keep ocean for backward compat during transition
        ocean: {
          50: '#E8F4FD', 100: '#C8E6F8', 200: '#90CCF1', 300: '#58B3EA',
          400: '#2099E3', 500: '#0A7FDC', 600: '#0866B0', 700: '#064C84',
          800: '#043358', 900: '#021A2C', 950: '#010D16',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0F172A 0%, #134E4A 50%, #0F172A 100%)',
        'hero-light': 'linear-gradient(180deg, #F0FDFA 0%, #FFFFFF 100%)',
        'cta-gradient': 'linear-gradient(135deg, #134E4A 0%, #0F172A 100%)',
        'accent-gradient': 'linear-gradient(135deg, #F5B942 0%, #F59E0B 100%)',
        'primary-gradient': 'linear-gradient(135deg, #2DD4BF 0%, #0EA5E9 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'count-up': 'countUp 0.8s ease-out',
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
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 24px rgba(0, 0, 0, 0.06)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 6px 24px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.06), 0 12px 40px rgba(0, 0, 0, 0.1)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'nav': '0 1px 0 rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.04)',
        'glow-primary': '0 0 24px rgba(45, 212, 191, 0.2)',
        'glow-accent': '0 0 24px rgba(245, 185, 66, 0.2)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
