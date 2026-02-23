/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg: '#09090f',
        surface: '#111118',
        surface2: '#1a1a24',
        border: 'rgba(255,255,255,0.07)',
        accent: '#7c6dfa',
        accent2: '#38e2c7',
        accent3: '#f97aad',
        muted: '#6b6b80',
      },
    },
  },
  plugins: [],
}