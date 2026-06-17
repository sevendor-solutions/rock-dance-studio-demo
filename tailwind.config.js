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
          dark: "#09090b",
          darker: "#030303",
          card: "#18181b",
          border: "#27272a",
          pink: "#ec4899",
          purple: "#8b5cf6",
          cyan: "#06b6d4",
          neonPink: "#ff007f",
          neonPurple: "#7f00ff"
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
