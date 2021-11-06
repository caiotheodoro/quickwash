import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import {useRouter} from 'next/router';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

interface SubscribeButtonProps {
    priceId: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        subscribeButton: {
            width: '260px',
            height: '4rem',
            border: 0,
            borderRadius: '2rem',
            background: theme.palette.primary.main,
            color: theme.palette.background.default,
            fontSize: '1.25rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        
            transition: 'filter 0.2s',
        
            '&:hover' : {
                filter: 'brightness(0.8)',
            },
        },
      
    })
);

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [sessions] = useSession();
    const router = useRouter();
    const classes = useStyles();

    const handleSubscribe = async () => {
        if(!sessions) {
            signIn('google');
            return;
        }

        if(sessions.activeSubscription) {
            router.push('/posts')
            return;
        }

        try {
            const response = await api.post('subscribe', {})
            const { sessionId } = response.data;

            const stripe = await getStripeJs();
            stripe.redirectToCheckout({ sessionId })
        } catch (err) {
            alert(err.message);
        }
    }

    return(
        <button 
            className={classes.subscribeButton} 
            type='button'
            onClick={handleSubscribe}
        >
            Subscibe now
        </button>
    )
}