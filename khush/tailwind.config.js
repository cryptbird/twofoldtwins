module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0a1026',
        darkgray: '#23272f',
        lightgray: '#f3f4f6',
        neonblue: '#00eaff',
        neonred: '#ff2253',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
