import { Paper } from '@mui/material';
import './App.css';
import ThemeSwitcher from './components/ThemeSwitcher';
import Home from './pages/Home';

function App() {
  return (
    <Paper>
      <ThemeSwitcher />
      <Home />
    </Paper>
  );
}

export default App;
