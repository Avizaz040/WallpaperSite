// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        geist: ['var(--font-geist-sans)', 'sans-serif'],
        geist_mono: ['var(--font-geist-mono)', 'monospace'],
        // michroma: ['var(--font-michroma)', 'sans-serif'],
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(to right, black, #134e4a)', // teal-900 HEX
      },
    },
  },
  plugins: [],
};
