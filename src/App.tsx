import { Home } from '@mui/icons-material';
import { Paper } from '@mui/material';
import React from 'react';
import './App.css';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  return (
    <Paper>
      <ThemeSwitcher />
      <Home />
    </Paper>
  );
}

export default App;
