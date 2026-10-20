/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fredoka', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          red: '#E61E2A',
          darkRed: '#C41620',
          yellow: '#FFD100',
          blue: '#1E6AE6',
          cream: '#FFFDF7',
          charcoal: '#1A1D24',
        }
      },
      boxShadow: {
        'toy': '0 8px 0 0 rgba(26, 29, 36, 0.12)',
        'toy-hover': '0 12px 0 0 rgba(230, 30, 42, 0.2)',
      }
    },
  },
  plugins: [],
}

