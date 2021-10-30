import { useState, useEffect, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonGroup from '@mui/material/ButtonGroup';

import { useTransactions } from '../../hooks/useTransactions';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, Input, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: "#FFFFFF"
        },
        button: {

            background: theme.palette.warning.main,

        },
        dialog: {
            backgroundColor: theme.palette.primary.dark,
        },
        title: {
            color: theme.palette.background.default,
            backgroundColor: theme.palette.primary.dark,
        },
        inputs: {
            padding: '2rem',
            paddingLeft: '0',
            
        },
        colorButtons: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,

        },
        input: {
            width: '100%',
            padding: '0 1.5rem',
            height: '4rem',
            borderRadius: '0.25rem',

            border: '1px solid #d7d7d7',
            background: '#e7e9ee',

            fontWeight: 400,
            fontSize: '1rem',
            transition: 'border-color 0.2s',

            '&::placeholder': {
                color: theme.palette.text.secondary,
            },

            '& + input': {
                marginTop: '1rem',
            },
        },
    })
);

export  function NewWashModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();
    const classes = useStyles();
    const [type, setType] = useState('Comum');
    const [vehicle, setVehicle] = useState('');
    const [amount, setAmount] = useState(0);


    async function handleCreateNewTransaction(e: FormEvent) {
        e.preventDefault();


        await createTransaction({
            vehicle,
            amount,
            type,
        });

        setVehicle('');
        setAmount(0);
        setType('Comum');
        onRequestClose();
    }

    function handleTypeChange(type: string) {
        setType(type); 
        type === 'Comum' ? setAmount(50) : setAmount(75);

    }

    return (
        <div>
            <Dialog open={isOpen} onClose={onRequestClose} >
                <DialogTitle className={classes.title}>Nova Lavagem</DialogTitle>
                <DialogContent className={classes.dialog}>
                    <DialogContentText className={classes.title}>
                        Insira os campos abaixo
                    </DialogContentText>
                    <Box >
                        <Input
                            className={classes.input + ' ' + classes.inputs}
                            placeholder="Título"
                            value={vehicle}
                            onChange={e => setVehicle(e.target.value)}
                        />
                        <ButtonGroup disableElevation variant="contained" className={ classes.inputs}>
                            <Button color={"secondary"} onClick={() => handleTypeChange('Comum')} className={ type == 'Comum' ? classes.button : ''}> Normal</Button>
                            <Button color={"secondary"} onClick={() => handleTypeChange('Premium')} className={ type == 'Premium' ? classes.button : ''}>Premium</Button>
                        </ButtonGroup>
                        <Typography className={classes.title}>
                        Valor: {type == 'Comum' ? 'R$ 50,00' : 'R$ 75,00'}
                        </Typography>
                         
                    </Box>
                </DialogContent>
                <DialogActions className={classes.dialog}>
                    <Button onClick={handleCreateNewTransaction} color={"secondary"}>Enviar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}