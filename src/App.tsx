import React from 'react';
import './App.css';

import { Container } from '@mui/material';

import { Authenticator } from '@aws-amplify/ui-react';

import TaskTracker from './pages/TaskTracker';

const App = ({ signOut, user }: any) => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Container sx={{ my: 4 }}>
          <TaskTracker />
        </Container>)}
    </Authenticator>
  );
}

export default App;
