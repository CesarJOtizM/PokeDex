import type { AppProps } from 'next/app'
import { GlobalStyle } from '@/styles/globalStyles'
import useDarkMode from 'use-dark-mode'
import { darkTheme, lightTheme } from '@/styles/theme'
import { ThemeProvider } from 'styled-components'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const { value } = useDarkMode(false, {
    storageKey: undefined,
    onChange: undefined
  })
  const theme = value ? darkTheme : lightTheme

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
