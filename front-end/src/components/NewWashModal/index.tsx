import Modal from 'react-modal';
import { FormEvent, useState, useContext } from 'react';

import { useTransactions } from '../../hooks/useTransactions';
import { createStyles, makeStyles } from '@mui/styles';
import { Button, Input, Theme } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image'


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flex: 1,

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
        submit: {
            width: '100%',
            padding: '0 1.5rem',
            height: '4rem',
            background: theme.palette.success.main,
            color: '#FFF',
            borderRadius: '0.25rem',
            border: 0,
            fontSize: '1rem',
            marginTop: '1.5rem',
            transition: 'filter 0.2s',
            fontWeight: 600,
            '&:hover': {
                filter: 'brightness(0.9)',
            },
        },
        type: {
            margin: '1rem 0',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
        },
        radiobox: {
            height: '4rem',
            border: '1px solid #d7d7d7',
            borderRadius: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ' &:hover': {
                borderColor: 'darken(0.1, "#d7d7d7")',
            }
        },
        span: {
            fontSize: '1rem',
            color: theme.palette.primary.main,
            display: 'inline-block',
            marginLeft: '1rem',
        },
        close : {
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'transparent',
            border: 0,
            transition: 'filter 0.2s',

            '&:hover': {
                filter: 'brightness(0.8)',
            },
        }

    })
);


export function NewWashModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();
    const classes = useStyles();
    const [type, setType] = useState('normal');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);

    async function handleCreateNewTransaction(e: FormEvent) {
        e.preventDefault();

        await createTransaction({
            title,
            amount,
            type,
        });

        setTitle('');
        setAmount(0);
        setType('deposit');
        onRequestClose();
    }

    return (
        <Modal
            style={{
                    content: {
                       width: '100%',
                       maxWidth: '576px',
                       background: '#FFF',
                       padding: '3rem',
                       position: 'relative',
                       borderRadius: '0.24rem',
                   },
                   overlay: {
                       background: 'rgba(0, 0, 0, 0.5)',
                       position: 'fixed',
                       top: 0,
                       left: 0,
                       right: 0,
                       bottom: 0,
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                   },
            }}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className={classes.close}>
                <img src={'close.svg'} alt="fechar" onClick={onRequestClose} width={20} height={20} />
            </button>
            <form onSubmit={handleCreateNewTransaction} >
               
                    <h2>Nova Lavagem</h2>
               
                <Input
                    className={classes.input}
                    placeholder="Título"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <input
                    className={classes.input}
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                />
                <Box className={classes.type}>
                    <Button
                        type="button"
                        className={classes.radiobox}
                        onClick={() => setType('normal')}

                    >
                        <img src={'basic.svg'} alt="Basico" width={100} height={100}/>
                        <Box className={classes.span}>Normal</Box>
                    </Button>
                    <Button
                        type="button"
                        className={classes.radiobox}
                        onClick={() => setType('premium')}
                    >
                        <img src={'premium.svg'} alt="Premium" width={100} height={100}/>
                        <Box className={classes.span}>Premium</Box>
                    </Button>
                </Box>


                <Button type="submit" className={classes.submit}>
                    Cadastrar
                </Button>
            </form>

        </Modal>
    );
}


