import {  Box, Theme, Button } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import Image from 'next/image'
import { theme } from '../../theme';
import { SignInButton } from '../SignInButton';
import Link from 'next/link'
import { useRouter } from 'next/router';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
 
    content: {
      maxWwidth: '1120px',
      margin: '0 auto',
      padding: '2rem 1rem 12rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rightside :{
      display: 'flex',

    },
    container : {
      backgroundColor: theme.palette.primary.main,
    },
    signIn: {
      height: '3rem',
      borderRadius: '3rem',
      backgroundColor: theme.palette.primary.light,
      border: 0,
      padding: '0 1.5rem',
      marginLeft: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  
      color: theme.palette.background.default,
      fontWeight: 'bold',
      transition: 'filter 0.2s',
      'svg' :{
          width: '20px',
          height: '20px',
      },
      'svg:first-child' :{
          marginRight: '1rem',
      },
     '&:hover' : {
          filter: 'brightness(0.8)',
      },
      'svg.closeIcon': {
          marginLeft: '1rem',
      }
  
  },
  image: {
    cursor: 'pointer',
  }
  })
);

export function HeaderDashboard({ onOpenNewTransactionModal }: HeaderProps) {
  const classes = useStyles();

  

  return (
    <header className={classes.container}>
      <Box className={classes.content}>
        <Link href="/"> 
        <Image src={'/images/logo.svg'} alt="dt money" width={230} height={30.75}  className={classes.image} />
        </Link>
        <Box className={classes.rightside} >
          <SignInButton />
        <Button type="button" style={{marginLeft: '1rem', backgroundColor: theme.palette.primary.light, color: theme.palette.background.default}} className={classes.signIn} onClick={onOpenNewTransactionModal}>
          Nova Lavagem
        </Button>
        </Box>
      </Box>
    </header>
  );
}