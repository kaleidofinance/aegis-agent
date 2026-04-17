/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "#111714",
        sidebarBg: "#1a211d",
        borderColor: "#29382f",
        board: "#000000",
        price: "#9eb7a8",
        inputPanel: "#0a0f0a",
        borderline: "#22C55E1A",
        'kaleido-green': {
          light: '#00ff99',
          DEFAULT: '#00ff6e',
          dark: '#22c55e',
          darker: '#2fa05e',
          darkest: '#0a140a',
        },
      },
      backgroundImage: {
        'kaleido-dark': 'linear-gradient(to bottom right, #1a2f1a, #0d1b0d, #0a140a)',
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
    },
  },
  plugins: [],
}
