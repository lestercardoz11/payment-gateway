module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#3C0174',
        secondary: '#172755',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
