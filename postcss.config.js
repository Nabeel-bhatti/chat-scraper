module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),  // Add this line for the new Tailwind plugin
    require('autoprefixer'),
  ],
  // plugins: {
  //   tailwindcss: {},
  //   autoprefixer: {},
  // },
}
