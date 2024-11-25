/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  resolve: {
    fallback: {
      http: false, // Ignore the `http` module as it isn't needed in the browser
    },
  },
}