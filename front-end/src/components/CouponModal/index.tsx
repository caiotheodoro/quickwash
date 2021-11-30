import { useTransactions } from '../../hooks/useTransactions';
import { createStyles, makeStyles } from '@mui/styles';
import { Dialog, Button, DialogContent, DialogActions, ButtonGroup, DialogTitle, DialogContentText } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow, Theme, Box } from "@mui/material";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

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
            marginTop: '2rem',
        },
        table: {
            width: '100%',
            borderSpacing: '0.5rem',
        },
        th: {
            color: theme.palette.background.default,
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
        dialog: {
            backgroundColor: theme.palette.primary.dark,
        },
        title: {
            color: theme.palette.background.default,
            backgroundColor: theme.palette.primary.dark,
        },
        text: {
            color: theme.palette.background.default,
        },
    })
);

interface coupon {
    dados(dados: any);

    data: {
        coupon: string;
    }


}

export function CouponModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();
    const classes = useStyles();
    const [coupons, setCoupons] = useState<coupon[]>([] as coupon[]);


    useEffect(() => {
        (async () => {
            const response = await api.get<coupon>('/coupons');
            setCoupons(response.data.dados);
        })();
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Dialog open={isOpen} onClose={onRequestClose} >
                <DialogTitle className={classes.title}>Cupons</DialogTitle>
                <DialogContent className={classes.dialog}>
                    <DialogContentText className={classes.title}>
                        Todos os cupons são válidos para todos os serviços.
                    </DialogContentText>
                    <Box className={classes.container}>
                        <Table className={classes.table}>
                            <TableHead className={classes.th}>
                                <TableRow>
                                    <TableCell className={classes.text}>Cupom</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    coupons.map((coupon: coupon) => (
                                        <TableRow>
                                            <TableCell className={classes.text}> {coupon.data.coupon} </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </Box>
                </DialogContent>
            </Dialog>
        </LocalizationProvider>
    );
}
