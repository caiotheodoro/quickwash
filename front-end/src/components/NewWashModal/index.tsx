import { useState, FormEvent } from 'react';

import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';

import { useTransactions } from '../../hooks/useTransactions';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, Input, Typography, TextField, Dialog, Button, Autocomplete, DialogContent, DialogActions, ButtonGroup, DialogTitle, DialogContentText } from '@mui/material';
import { Box } from '@mui/system';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
const options = ['Carro', 'Moto', 'Caminhão', 'Outros'];
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import { useRouter } from 'next/router';
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
            backgroundColor: theme.palette.primary.main,

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
        autocomplete: {
            background: '#e7e9ee',
            color: theme.palette.text.primary,
            marginTop: '1rem',
            borderRadius: '0.25rem',

        },
        input: {
            width: '100%',
            padding: '0 1.5rem',
            height: '3.5rem',
            borderRadius: '0.25rem',

            background: '#e7e9ee',
            marginTop: '1rem',
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





export function NewWashModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();
    const classes = useStyles();
    const [inputValue, setInputValue] = useState<string>('');
    const [sessions] = useSession();
    const router = useRouter();

    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('Comum');
    const [scheduleDate, setScheduleDate] = useState<Date>(new Date('2021-11-02T00:00:00.000Z'));
    const [vehicle, setVehicle] = useState('');
    const [observation, setObservation] = useState('');
    const [plate, setPlate] = useState('');
    const [price, setPrice] = useState('price_1JstmdDqVzUtyqwcfb0fiV98');
    const [payment, setPayment] = useState<'cash' | 'card'>('cash');
    const [vehicleType, setVehicleType] = useState<'Carro' | 'Moto' | 'Caminhão' | 'Outros'>('Carro');
    const [coupon, setCoupon] = useState('');

    async function handleCreateNewTransaction(e: FormEvent) {
        e.preventDefault();


        await createTransaction({
            type,
            vehicle,
            amount,
            plate,
            observation,
            scheduleDate,
            coupon,
            payment,
            vehicleType,
        });

        setVehicle('');
        setAmount(0);
        setType('Comum');
        onRequestClose();
    }

    async function handleTypeChange(type: string) {
        setType(type);
        type === 'Comum' ? setAmount(50) : setAmount(75);
        setPrice(type === 'Comum' ? 'price_1JstmdDqVzUtyqwcfb0fiV98' : 'price_1JstmdDqVzUtyqwcpGu1Qkz5');


    }


    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Dialog open={isOpen} onClose={onRequestClose} >
                    <DialogTitle className={classes.title}>Nova Lavagem</DialogTitle>
                    <DialogContent className={classes.dialog}>
                        <DialogContentText className={classes.title}>
                            Insira os campos abaixo
                        </DialogContentText>
                        <Box >
                            <Autocomplete
                                value={vehicleType}
                                onChange={(inputValue) => {
                                    setVehicleType(inputValue);
                                }}
                                inputValue={inputValue}
                                className={classes.autocomplete}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                options={options}
                                renderInput={(params) => <TextField {...params} placeholder="Tipo de veículo" sx={{ color: '#000' }} />}
                            />
                            <Input
                                className={classes.input + ' ' + classes.inputs}
                                placeholder="Modelo"
                                value={vehicle}
                                onChange={e => setVehicle(e.target.value)}
                            />
                            <Input
                                className={classes.input + ' ' + classes.inputs}
                                placeholder="Placa"
                                value={plate}
                                onChange={e => setPlate(e.target.value)}
                            />
                            <ButtonGroup disableElevation variant="contained" className={classes.inputs}>
                                <Button color={type == 'Comum' ? "warning" : "secondary"} onClick={() => handleTypeChange('Comum')} className={type == 'Comum' ? classes.button : ''}> Normal</Button>
                                <Button color={type != 'Comum' ? "warning" : "secondary"} onClick={() => handleTypeChange('Premium')} className={type == 'Premium' ? classes.button : ''}>Premium</Button>
                            </ButtonGroup>
                            <Typography className={classes.title}>
                                Valor: {type == 'Comum' ? 'R$ 50,00' : 'R$ 75,00'}
                            </Typography>
                            <DesktopDateTimePicker
                                value={scheduleDate}
                                views={['month', 'day', 'hours']}
                                className={classes.input + ' ' + classes.inputs + '' + classes.autocomplete}
                                onChange={(newValue) => {
                                    setScheduleDate(newValue);
                                }}


                                renderInput={(params) => <TextField {...params} className={classes.input} />}
                            />
                            <Input
                                className={classes.input + ' ' + classes.inputs}
                                placeholder="Observações"
                                value={observation}
                                onChange={e => setObservation(e.target.value)}
                            />
                            <ButtonGroup disableElevation variant="contained" className={classes.inputs}>
                                <Button color={payment == 'cash' ? "warning" : "secondary"} onClick={() => setPayment('cash')} className={payment == 'cash' ? classes.button : ''}> Dinheiro</Button>
                                <Button color={payment == 'card' ? "warning" : "secondary"} onClick={() => setPayment('card')} className={payment == 'card' ? classes.button : ''}>Cartão</Button>
                            </ButtonGroup>
                            <Input
                                className={classes.input + ' ' + classes.inputs}
                                placeholder="Cupom de desconto"
                                value={coupon}
                                onChange={e => setCoupon(e.target.value)}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions className={classes.dialog}>
                        <Button onClick={handleCreateNewTransaction} color={"secondary"}>Realizar pagamento</Button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
        </div>
    );
}

