import { useState, FormEvent, useEffect } from 'react';

import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import { useTransactions } from '../../hooks/useTransactions';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, Input, Typography, TextField, Dialog, Button, Autocomplete, DialogContent, DialogActions, ButtonGroup, DialogTitle, DialogContentText, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
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

interface coupon {
    dados(dados: any);

    data: {
        coupon: string;
    }


}



export function NewWashModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();
    const classes = useStyles();
    const [inputValue, setInputValue] = useState<string>('');
    const [session] = useSession();
    const router = useRouter();

    const [amount, setAmount] = useState(50);
    const [type, setType] = useState('Comum');
    const [scheduleDate, setScheduleDate] = useState<Date>(new Date());
    const [vehicle, setVehicle] = useState('');
    const [observation, setObservation] = useState('');
    const [plate, setPlate] = useState('');
    const [price, setPrice] = useState('price_1JyP5fDqVzUtyqwcK7kJZdu8');
    const [payment, setPayment] = useState<'cash' | 'card'>('cash');
    const [vehicleType, setVehicleType] = useState<string>('Carro');
    const [coupons, setCoupons] = useState<coupon[]>([] as coupon[]);
    const [coupon, setCoupon] = useState('');
    async function handleCreateNewTransaction(e: FormEvent) {

        e.preventDefault();

        if (!session) {
            signIn('google');
            return
        }



        try {

            //const response = await api.post('/subscribe')

            const response = await api.post('/subscribe', {
                type,
                vehicle,
                amount,
                plate,
                observation,
                scheduleDate,
                coupon,
                payment,
                price,
                vehicleType, createdAt: new Date().toISOString()
            });

            /*  await createTransaction({
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
              */



            const { sessionId } : any = response.data;
            const stripe = await getStripeJs()
            console.log("stripe", stripe);
            await stripe.redirectToCheckout({ sessionId })

        } catch (err) {
            console.log(err)
            alert(err.message);
        }




        setVehicle('');
        setAmount(0);
        setType('Comum');
        onRequestClose();
    }

    async function handleTypeChange(type: string) {
        setType(type);
        type === 'Comum' ? setAmount(50) : setAmount(75);
        
        setPrice(type === 'Comum' ? 'price_1JyP5fDqVzUtyqwcK7kJZdu8' : 'price_1JyP5fDqVzUtyqwcPBqfPQJf');
        

    }
    
    function handleChangeCoupon(e: any, value: any) {
        setCoupon(value);
        if(value != ''){
            setPrice('price_1K1ZWWDqVzUtyqwcj8CS7hgj');
            setAmount(0);
        }

    }

    useEffect(() => {
        (async () => {
            const response = await api.get<coupon>('/coupons');
            setCoupons(response.data.dados);
        })();
        
    }, []);

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
                                onChange={(event, inputValue) => {
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
                                id="Modelo"
                                value={vehicle}
                                onChange={e => setVehicle(e.target.value)}
                                required
                            />
                            <Input
                                className={classes.input + ' ' + classes.inputs}
                                placeholder="Placa"
                                id="Placa"
                                value={plate}
                                onChange={e => setPlate(e.target.value)}
                                required
                            />
                            <ButtonGroup disableElevation variant="contained" className={classes.inputs}>
                                <Button id="Comum" color={type == 'Comum' ? "warning" : "secondary"} onClick={() => handleTypeChange('Comum')} > Normal</Button>
                                <Button id="Premium" color={type != 'Comum' ? "warning" : "secondary"} onClick={() => handleTypeChange('Premium')} >Premium</Button>
                            </ButtonGroup>
                            <Typography className={classes.title}>
                                Valor: {type == 'Comum' ? 'R$ 50,00' : 'R$ 75,00'}
                            </Typography>
                            <DesktopDateTimePicker
                                value={scheduleDate}
                                views={['month', 'day', 'hours']}
                                className={classes.inputs + '' + classes.autocomplete}
                                onChange={(newValue) => {
                                    setScheduleDate(newValue);
                                }}

                                minDate={new Date()}
                                renderInput={(params) => <TextField {...params} className={classes.autocomplete} />}
                            />
                            <Input
                                className={classes.input + ' ' + classes.inputs}
                                placeholder="Observações"
                                id="Observacao"
                                value={observation}
                                onChange={e => setObservation(e.target.value)}
                            />
                            <ButtonGroup disableElevation variant="contained" className={classes.inputs}>
                                <Button color={payment == 'cash' ? "warning" : "secondary"} id="Dinheiro" onClick={() => setPayment('cash')} > Dinheiro</Button>
                                <Button color={payment == 'card' ? "warning" : "secondary"} id="Cartao" onClick={() => setPayment('card')} >Cartão</Button>
                            </ButtonGroup>
                        
                                <Select
                                 className={classes.input + ' ' + classes.inputs}
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={coupon}
                                    label="Age"
                                    onChange={e => handleChangeCoupon(e, e.target.value)}
                                >
                                       <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    { coupons.map((coupon: coupon) => (
                                        <MenuItem value={coupon.data.coupon}>
                                            {coupon.data.coupon}
                                        </MenuItem>
                                    ))}
                          
                                </Select>
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

