// GlobalStyles.tsx
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

const GlobalStyles = () => (
    <MUIGlobalStyles
        styles={{
            body: {
                backgroundColor: '#111927',
                backgroundImage: `
                    radial-gradient(at 47% 33%, hsl(162.00, 77%, 40%) 0, transparent 59%),
                    radial-gradient(at 82% 65%, hsl(218.00, 39%, 11%) 0, transparent 55%)
                `,
                margin: 0,
                padding: 0,
                height: '100%',
                width: '100%',
                overflow: 'hidden',
            },
        }}
    />
);

export default GlobalStyles;
