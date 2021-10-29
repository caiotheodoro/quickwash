
import { Table, TableBody, TableCell, TableHead, TableRow, Theme, Box } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useTransactions } from "../../hooks/useTransactions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flex: 1,

        },
        content: {
            maxWwidth: '1120px',
            margin: '0 auto',
            padding: '2rem 1rem 12rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        container: {
            marginTop: '4rem',
        },
        table: {
            width: '100%',
            borderSpacing: '0.5rem',
        },
        th : {
            color: theme.palette.text.primary,
            fontWeight: 400,
            padding: '1rem 2rem',
            textAlign: 'left',
            lineHeight: '1.5rem',
        },
        td: {
            padding: '1rem 2rem',
            border: 0,
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: '0.25rem',
    
            '&:first-child': {
                color: theme.palette.primary.light,
            },
          
         },
    })
);

export function TransactionsTable() {
    const classes = useStyles();
    const { transactions } = useTransactions();;


    return (
        <Box className={classes.container}>
            <Table className={classes.table}>
                <TableHead className={classes.th}>
                    <TableRow>
                        <TableCell>Tipo de lavagem</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Data</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(transaction => (
                        <TableRow key={transaction.id}>
                            <TableCell>{transaction.title}</TableCell>
                            <TableCell className={transaction.type}>
                                {new Intl.NumberFormat('pt-BR',
                                    {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(transaction.amount)}

                            </TableCell>
                            <TableCell>  {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </Box>
    );
}