import {  Box, Theme, Button } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import Image from 'next/image'
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
    container : {
      backgroundColor: theme.palette.primary.main,
    },
    buttonTransaction: {
      fontSize: '1rem',
      fontFamily: 'Inter',
      color: '#fff',
      background: theme.palette.primary.light,
      border: 0,
      padding:' 0 2rem',
      borderRadius: '0.25rem',
    height: '3rem',

    transition: 'filter 0.2s',
    '&:hover' : {
      filter: 'brightness(0.9)',
    },
  },
  })
);

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  const classes = useStyles();


  return (
    <header className={classes.container}>
      <Box className={classes.content}>
        <Image src={'/logo.svg'} alt="dt money" width={230} height={30.75} />
        <Button type="button" className={classes.buttonTransaction} onClick={onOpenNewTransactionModal}>
          Nova Lavagem
        </Button>
      </Box>
    </header>
  );
}