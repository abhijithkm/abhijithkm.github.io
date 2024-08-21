import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ComputerIcon from '@mui/icons-material/Computer';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { IThemeContext, IThemeMode } from '../ThemeContext/types';

const ThemeSwitcher: React.FC = () => {
    const { themeMode, switchThemeMode } = useContext(ThemeContext) as IThemeContext;

    const handleChange = (_event: React.MouseEvent<HTMLElement>, mode: IThemeMode) => {
        if (mode) switchThemeMode(mode);
    };

    return (
        <ToggleButtonGroup
            value={themeMode}
            exclusive
            onChange={handleChange}
            aria-label="Theme Mode"
            sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                bgcolor: 'inherit',
            }}
        >
            <ToggleButton value={IThemeMode.LIGHT} aria-label="Light Mode">
                <Brightness7Icon />
            </ToggleButton>
            <ToggleButton value={IThemeMode.DARK} aria-label="Dark Mode">
                <Brightness4Icon />
            </ToggleButton>
            <ToggleButton value={IThemeMode.SYSTEM} aria-label="System Default">
                <ComputerIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ThemeSwitcher;
