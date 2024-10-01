module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
      extend: {
        fontFamily: {
          serif: ['Bree Serif', 'serif'],
        },
      },
    },
    variants: {},
    plugins: [],
  }