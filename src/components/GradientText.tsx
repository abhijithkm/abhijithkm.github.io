import { Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface GradientTextProps {
    children: ReactNode;
    sx?: object;
}

const GradientText: React.FC<GradientTextProps> = ({ children, sx }) => {
    const theme = useTheme();

    return (
        <Typography
            sx={{
                ...sx,
                fontWeight: 700,
                background: `linear-gradient(to right, ${theme.custom.gradientStart}, ${theme.custom.gradientEnd})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline',
            }}
        >
            {children}
        </Typography>
    );
};

export default GradientText;
