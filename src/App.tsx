import React from 'react';
import './App.css';

import { Container } from '@mui/material';

import TaskTracker from './pages/TaskTracker';

function App() {
  return (
    <Container sx={{ my: 4 }}>
      <TaskTracker />
    </Container>
  );
}

export default App;
