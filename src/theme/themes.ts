// src/theme/themes.ts

import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f2e5f6',
        },
        background: {
            default: '#060307',
            paper: '#060307',
        },
        text: {
            primary: '#9341b4',
            secondary: '#694d26',
        },
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#17091b',
        },
        background: {
            default: '#fbf8fc',
            paper: '#fbf8fc',
        },
        text: {
            primary: '#9e4bbe',
            secondary: '#d9bd96',
        },
    },
});
