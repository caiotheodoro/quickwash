import { createTheme } from '@mui/material'


export const theme = createTheme({
  palette: {
    primary: {
      main: '#1b2a61',
      dark: '#121d43',     
      light: '#485480', 
    },
    secondary: {
      main: '#648dae',
      dark: '#466279',
      light: '#83a3be',
    },
    text: { 
      primary: '#363F5F',
      secondary: '#ffffff',
      disabled: '#f0f4c3',
    },
    background: {
      default: '#f8f8f8',
      paper: '#dfdfdf',
    },
    error: {
      main: '#E62E4D',
    },
    success: {
      main: '#33CC95',
    },
    warning: {
      main: '#ffca28',
    },
    divider: '#e0e0e0',
  },
});

