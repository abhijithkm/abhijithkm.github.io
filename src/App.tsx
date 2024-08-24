import { Paper } from '@mui/material';
import './App.css';
import Home from './components/Home';

function App() {
    return (
        <Paper
            sx={{
                width: '100vw',
                height: '100vh',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                backgroundImage: `linear-gradient(to top, #e1e1e1, #e8e8e8, #f0f0f0, #f7f7f7, #ffffff);`
            }}
            square
        >
            <Home />
        </Paper>
    );
}

export default App;
