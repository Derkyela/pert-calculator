/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'sortable-ghost',
    'sortable-chosen',
    'sortable-drag',
  ],
}
