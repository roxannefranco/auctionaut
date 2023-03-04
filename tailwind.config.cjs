/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.html', './src/js/*.js', './src/css/*.css'],
  theme: {
    extend: {}
  },
  plugins: [],
  safelist: ['inline-block', '!my-0', '!px-0', 'mt-6', 'text-xs', 'pt-6']
}
