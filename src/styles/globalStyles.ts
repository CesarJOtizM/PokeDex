import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* @import "https://fonts.googleapis.com/css2?family=Poppins&display=swap"; */
    font-family: Poppins, sans-serif;
  }
`

export { GlobalStyle }
