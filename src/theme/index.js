import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#A8995A',
      light: '#bdb582',
      dark: '#67581d',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#544d4e',
    },
  },
};

const theme = createTheme(themeOptions);

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
};

