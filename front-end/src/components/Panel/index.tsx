import { Container, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Summary } from "../Summary";
import { TransactionsTable } from "../HistoryTable";


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
        maxWidth:'1120px',
        margin: '0 auto',
        padding:'2.5rem',
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


export function Panel() {

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Summary />
            <TransactionsTable />
        </Container>
    );
}

