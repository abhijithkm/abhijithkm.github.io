import { Theme, ThemeProvider, useMediaQuery } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { AppDarkTheme, AppLightTheme } from "./theme";
import { IThemeContext, IThemeMode } from "./types";

export const ThemeContext = createContext<IThemeContext | null>(null);

export const ThemeContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [themeMode, setThemeMode] = useState<IThemeMode>(IThemeMode.LIGHT)
    const [theme, setTheme] = useState<Theme>(AppLightTheme)

    const SYSTEM_THEME: Exclude<IThemeMode, IThemeMode.SYSTEM> = useMediaQuery("(prefers-color-scheme:dark)") ? IThemeMode.DARK : IThemeMode.LIGHT;

    useEffect(() => {
        const mode = _getThemeModeFromPref();
        setThemeMode(mode);
    }, [])
    useEffect(() => {
        switch (themeMode) {
            case IThemeMode.LIGHT:
                setTheme(AppLightTheme)
                break;
            case IThemeMode.DARK:
                setTheme(AppDarkTheme)
                break;
            case IThemeMode.SYSTEM:
                switch (SYSTEM_THEME) {
                    case IThemeMode.LIGHT:
                        setTheme(AppLightTheme)
                        break;
                    case IThemeMode.DARK:
                        setTheme(AppDarkTheme)
                        break;
                }
                break;
            default:
                setTheme(AppLightTheme);
                break;

        }
    }, [themeMode, SYSTEM_THEME])

    const _getThemeModeFromPref = (): IThemeMode => {
        const mode = localStorage.getItem("themeMode") as IThemeMode
        if (mode) {
            return mode;
        }
        return IThemeMode.LIGHT
    }
    const _setThemeModeToPref = (mode: IThemeMode) => {
        localStorage.setItem('themeMode', mode)
    }

    const switchThemeMode = (mode: IThemeMode) => {
        setThemeMode(mode);
        _setThemeModeToPref(mode)
    }
    return <ThemeContext.Provider value={{
        themeMode, switchThemeMode
    }}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </ThemeContext.Provider>
}