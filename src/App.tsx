import './App.css';

import { Container, Grid } from '@mui/material';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import TaskTracker from './pages/TaskTracker';

const App = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      {/* <Container sx={{ my: 4 }}> */}
      <Grid item>
      <Authenticator >
        {({ signOut, user }: any) => (
          <TaskTracker />)}
      </Authenticator>
      </Grid>
      {/* </Container> */}
    </Grid>
  );
}

export default App;
