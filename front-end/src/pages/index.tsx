import Head from 'next/head'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer';
import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    contentContainer: {
      maxWidth: '1120px',
      margin: '0 auto',
      padding: '0 2rem',
      height: 'calc(100vh - 5rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  })
);

export default function Home({product} : HomeProps) {
  const classes = useStyles();
  
  return (
    <>
      <Head>
        <title>Home | QuickWash</title>
      </Head>
      <Header />
      <Footer />
    </>
  )
}

