import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme'
import Head  from 'next/head'
import { createServer, Model } from 'miragejs'

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions:[
        {
          id: 1,
          vehicle: 'Astra',
          type: 'Premium',
          amount: 100,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          vehicle: 'Gol',
          type: 'Comum',
          amount: 300,
          createdAt: new Date('2020-02-12 09:00:00'),
        },]
    });
  },

  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      
      return schema.create('transaction', data);
    })
  }
});

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
