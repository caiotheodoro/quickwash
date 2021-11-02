
import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import {Provider as NextAuthProvider} from 'next-auth/client';
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      </ThemeProvider>
    </NextAuthProvider>
  );
}

export default MyApp
