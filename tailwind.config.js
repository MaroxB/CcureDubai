/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#A41162',
          secondary: '#953D7F',
          accent: '#F162ED',
        },
        blush: {
          mist: '#F9E8F3',
          light: '#F4D6EC',
        },
        orchid: {
          haze: '#EDD8E8',
          light: '#E5C8DF',
        },
        petal: {
          glow: '#FBE5FA',
        },
        ivory: '#FAF7F5',
        cream: '#F5F0EC',
        mauve: {
          silk: '#D4A8C7',
          deep: '#B07097',
          shadow: '#6B3D60',
        },
        text: {
          dark: '#2C2028',
          muted: '#7A6270',
          soft: '#9D8090',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 24px 0 rgba(164, 17, 98, 0.06)',
        'soft-lg': '0 8px 40px 0 rgba(164, 17, 98, 0.10)',
        'card': '0 2px 16px 0 rgba(44, 32, 40, 0.07)',
        'card-hover': '0 8px 32px 0 rgba(44, 32, 40, 0.12)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #A41162 0%, #953D7F 50%, #F162ED 100%)',
        'gradient-soft': 'linear-gradient(135deg, #F9E8F3 0%, #EDD8E8 50%, #FBE5FA 100%)',
        'gradient-hero': 'linear-gradient(160deg, #FAF7F5 0%, #F9E8F3 35%, #EDD8E8 70%, #FAF7F5 100%)',
        'gradient-footer': 'linear-gradient(180deg, #F5F0EC 0%, #EDD8E8 100%)',
        'gradient-cta': 'linear-gradient(135deg, #A41162 0%, #953D7F 100%)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-delay': 'float 10s ease-in-out 2s infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'carousel': 'carousel 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-18px) scale(1.02)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        carousel: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
