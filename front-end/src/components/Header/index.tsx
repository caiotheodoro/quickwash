import { SignInButton } from '../SignInButton';
import { Box } from '@mui/system';
import { useSession } from 'next-auth/client';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import Link from 'next/link';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        headerContainer: {
            height: '5rem',
            borderBottom: '1px solid' + theme.palette.divider,
            backgroundColor: theme.palette.primary.dark,
        },
        headerContent: {
            maxWidth: '1120px',
            height: '5rem',
            padding: '0 2rem',
            justifyContent: 'space-between',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            'button': {
                marginLeft: 'auto',
            },

        },
        nav: {
            marginLeft: '5rem',
            height: '5rem',
            display: 'inline-flex',

        },
        signIn: {
            height: '3rem',
            borderRadius: '3rem',
            backgroundColor: theme.palette.primary.light,
            border: 0,
            padding: '0 1.5rem',
            marginLeft: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            color: theme.palette.background.default,
            fontWeight: 'bold',
            transition: 'filter 0.2s',
            'svg': {
                width: '20px',
                height: '20px',
            },
            'svg:first-child': {
                marginRight: '1rem',
            },
            '&:hover': {
                filter: 'brightness(0.8)',
            },
            'svg.closeIcon': {
                marginLeft: '1rem',
            }

        },
        firstBlock: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& a': {
                color: theme.palette.background.default,
                fontWeight: 'bold',
                transition: 'filter 0.2s',
                '&:hover': {
                    filter: 'brightness(0.8)',
                },
            },
        },
        aTag: {
            textDecoration: 'none',
            fontFamily: 'Inter',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            padding: '0 0.5rem',
            height: '5rem',
            lineHheight: '5rem',
            color: theme.palette.secondary.main,
            transition: 'color 0.2s',

            '& + a': {
                marginLeft: '2rem',
                textDecoration: 'none',
            },

            '&:hover': {
                color: theme.palette.background.default,
            },
            '&.active': {
                color: theme.palette.primary.dark,
                fontWeight: 'bold',
                textDecoration: 'none',
            },
            '&.active::after': {
                height: '3rem',
                borderRadius: '3rem',
                backgroundColor: theme.palette.primary.light,
                border: 0,
                padding: '0 1.5rem',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                color: theme.palette.background.default,
                fontWeight: 'bold',
                transition: 'filter 0.2s',
            },

        }
    })
);

export function Header() {

    const [session] = useSession();
    const classes = useStyles();

    return (
        <header className={classes.headerContainer}>
            <div className={classes.headerContent}>
                <Box className={classes.firstBlock}>
                    <img src="/images/logo.svg" alt="quickwash" width={200} />
                    <nav className={classes.nav} >
                        <Link href={"/"}>
                            <a className={classes.aTag}>Home</a>
                        </Link>
                        { session &&
                            <Link href={"/dashboard"} prefetch >
                                <a className={classes.aTag}>Dashboard</a>
                            </Link>
                        }
                    </nav>
                </Box>
                <SignInButton />
            </div>
        </header>
    );
}