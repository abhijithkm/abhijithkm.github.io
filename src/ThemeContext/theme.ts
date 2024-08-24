import { createTheme, Theme } from '@mui/material/styles';
declare module '@mui/material/styles' {
    interface Theme {
        custom: {
            gradientStart: string;
            gradientEnd: string;
            boxShadow: string;
            boxShadowHover: string;
        };
    }
    interface ThemeOptions {
        custom?: {
            gradientStart: string;
            gradientEnd: string;
            boxShadow: string;
            boxShadowHover: string;
        };
    }
}
export const AppLightTheme: Theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#333333',
        },
    },
    custom: {
        gradientStart: '#ea586c',
        gradientEnd: '#cb5db5',
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        boxShadowHover: "0 6px 12px rgba(0, 0, 0, 0.3)"
    },

});

export const AppDarkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#ce93d8',
        },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#ffffff',
            secondary: '#aaaaaa',
        },
    },
    custom: {
        gradientStart: '#ea586c',
        gradientEnd: '#cb5db5',
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        boxShadowHover: "0 6px 12px rgba(0, 0, 0, 0.3)"
    },
});
