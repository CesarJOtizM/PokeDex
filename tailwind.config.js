module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      minHeight: {
        96: '24rem',
        s: '15rem'
      },
      maxWidth: {
        96: '24rem',
        '8xl': '88rem',
        s: '15rem'
      },
      height: {
        s: '15rem',
        85: '23rem'
      },
      width: {
        s: '15rem'
      },
      backgroundImage: {
        forest: "url('/images/wallPaper.jpg')"
      }
    }
  },
  plugins: []
}
