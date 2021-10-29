import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme'
import Head  from 'next/head'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Quick Wash</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
