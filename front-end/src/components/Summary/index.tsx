
import { useTransactions } from "../../hooks/useTransactions";
import { createStyles, makeStyles } from "@mui/styles";
import { Button, Theme } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Box } from "@mui/system";
import { CouponModal } from "../CouponModal";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flex: 1,
        },
        content: {
            background: theme.palette.background.paper,
            padding: ' 1.5rem 2rem',
            borderRadius: '0.25rem',
            color: theme.palette.primary.main,
        },
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginTop: '-10rem',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        strong: {
            display: 'block',
            marginTop: '1rem',
            fontSize: '2rem',
            fontWeight: 500,
            lineHeight: '3rem',
        },
        cars: {
            background: theme.palette.primary.dark,
            padding: ' 1.5rem 2rem',
            borderRadius: '0.25rem',
            color: theme.palette.text.secondary,
        }
    })
);

export function Summary() {
    const [isOpen, setIsOpen] = useState(false);
    const { transactions } = useTransactions();
    const classes = useStyles();

    const summary = transactions.reduce((acc, transaction) => {

        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
        return acc;
    }, {
        deposits: 0,
        total: 0
    });

    function handleOpenNewTransactionModal() {
        setIsOpen(true);
      }
      function handleCloseNewTransactionModal() {
        setIsOpen(false);
      }

    return (
        <Box className={classes.container}>
            <div className={classes.content}>
                <Box className={classes.header}>
                    <p>Gastos</p>
                </Box>
                <Box className={classes.strong}>{new Intl.NumberFormat('pt-BR',
                    {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)}
                </Box>
            </div>
            <div>
                <div className={classes.content}>
                    <Box className={classes.header}>
                        <p>Cupons</p>
                    </Box>
                    <Box className={classes.strong}>
                        <Button variant="contained" endIcon={<SendIcon />} onClick={handleOpenNewTransactionModal}>
                            Listar Cupons
                        </Button>
                    </Box>
                </div>
            </div>
            <div className={classes.cars}>
                <Box className={classes.header}>
                    <p>Carros cadastrados</p>
                </Box>
                <Box className={classes.strong}>{3}
                </Box>
            </div>
            <CouponModal isOpen={isOpen} onRequestClose={handleCloseNewTransactionModal}/>
        </Box>
    );
}