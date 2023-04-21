import React from 'react';
import './App.css';

import { Container } from '@mui/material';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import TaskTracker from './pages/TaskTracker';

const App = () => {
  return (
    <Container sx={{ my: 4 }}>
      <Authenticator>
        {({ signOut, user }: any) => (
          <TaskTracker />)}
      </Authenticator>
    </Container>
  );
}

export default App;
