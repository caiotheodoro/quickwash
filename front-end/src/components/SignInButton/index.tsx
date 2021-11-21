import { FaGithub, FaGoogle } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/client'
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { useEffect } from 'react';
import router from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        signIn: {
            height: '3rem',
            borderRadius: '3rem',
            backgroundColor: theme.palette.primary.light,
            border: 0,
            padding: '0 1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        
            color: theme.palette.background.default,
            fontWeight: 'bold',
            transition: 'filter 0.2s',
            'svg' :{
                width: '20px',
                height: '20px',
            },
            'svg:first-child' :{
                marginRight: '1rem',
            },
           '&:hover' : {
                filter: 'brightness(0.8)',
            },
            'svg.closeIcon': {
                marginLeft: '1rem',
            }
        
        },
        closeIcon: {
            marginLeft: '1rem',
            color: theme.palette.primary.main,
        }
      
    })
);

export function SignInButton() {
    const [session ] = useSession();
    const classes = useStyles();

    function handleOut () {
        signOut();
        router.push('/');
    }

    return session ? (
        <button type="button"
            className={classes.signIn}
            onClick={handleOut}>
            <FaGoogle color="#04d361" style={{marginRight: '1rem'}} />
            {session.user?.name}
            <FiX  className={classes.closeIcon} />
        </button>
    ) : (
        <button type="button"
            onClick={() => signIn('google')}
            className={classes.signIn}>
            <FaGithub color="#04d361" style={{marginRight: '1rem'}} />
            Logar com o Google
        </button>
    );
}