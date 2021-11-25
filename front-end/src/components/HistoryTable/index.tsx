
import { Table, TableBody, TableCell, TableHead, TableRow, Theme, Box, TextField } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { format } from "path";
import { useEffect, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { api } from "../../services/api";

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
        th: {
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
interface Get {
        data: {
          id: number;
          amount: number;
          vehicle: string;
          type: string;
          createdAt: Date;
          plate: string;
          observation: string;
          scheduleDate: Date;
          payment: string;
        }
}

export function TransactionsTable() {
    const classes = useStyles();
    const [transactions,setTransactions ] = useState<Get[]>([] as Get[]);
    const {retrieveTransactions} = useTransactions();

    useEffect(() => {
        (   async () => {
            const data = await retrieveTransactions();
            setTransactions(data.dados);
        })();


    } , []);
    
    return (
        <Box className={classes.container}>
            <Table className={classes.table}>
                <TableHead className={classes.th}>
                    <TableRow>
                        <TableCell>Veículo</TableCell>
                        <TableCell>Tipo de lavagem</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Data agendamento</TableCell>
                        <TableCell>Data solicitação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions?.map(transaction => (
                        <TableRow key={transaction.data.id}>
                            <TableCell>{transaction.data.vehicle + ' - ' + transaction.data.plate}</TableCell>
                            <TableCell>{transaction.data.type}</TableCell>
                            <TableCell className={transaction.data.type}>
                                {new Intl.NumberFormat('pt-BR',
                                    {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(transaction.data.amount) + ' - ' +  (transaction.data.payment === 'cash' ? 'Dinheiro' : 'Cartão') }

                            </TableCell>
                            <TableCell> 
                            { 
                                new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.data.scheduleDate))
                            }
                           
                            </TableCell>
                            <TableCell>  {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.data.createdAt))}</TableCell>
                        </TableRow>
                        ))}
                
                </TableBody>
            </Table>
        </Box>
    );
}