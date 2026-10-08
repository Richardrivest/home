/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./tailwind/preset.cjs')],
  content: ['./src/**/*.{js,jsx}', './html/**/*.html'],
  corePlugins: { preflight: false },
};
