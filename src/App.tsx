import React from 'react';
import './App.css';

import { Container } from '@mui/material';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import TaskTracker from './pages/TaskTracker';

const App = () => {
  return (
    <Authenticator>
      {({ signOut, user }: any) => (
        <Container sx={{ my: 4 }}>
          <TaskTracker />
        </Container>)}
    </Authenticator>
  );
}

export default App;
