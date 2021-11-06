import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        Quick Wash
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    footerContent: {
      py: 3,
      px: 2,
      marginTop: 'auto',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.light,
    },
  })
);

export function Footer() {
  const classes = useStyles();
  return (
    <Box 
      className = {classes.footer}
    >
    <CssBaseline />
    <Box
      component="footer"
      className={classes.footerContent}
    >
    <Container maxWidth="sm">
        <Typography variant="body1" color = 'white'>
        All rights reserved.
        </Typography>
        <Copyright />
    </Container>
    </Box>
    </Box>
  );
}