import { createTheme, Theme } from "@mui/material";

export const AppLightTheme: Theme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: 'rgb(243,252,255)',
            paper: 'rgb(255,255,255)',
        }
    }
})
export const AppDarkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: 'rgb(33,37,39)',
            paper: 'rgb(41,44,49)',
        }
    }
})