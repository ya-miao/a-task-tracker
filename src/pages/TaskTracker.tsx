import { Button, Container, Grid, Stack } from "@mui/material";

import Sidebar from "../components/Sidebar";
import ToDoList from "../components/ToDoList";

import { Auth } from 'aws-amplify';

// Here is the container for the TaskTracker components
const TaskTracker = () => {

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <Stack>
      <Button onClick={signOut}>Sign Out</Button>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <ToDoList />
        </Grid>
        <Grid item xs={4}>
          <Sidebar />
        </Grid>
      </Grid>
    </Stack >
  )
};

export default TaskTracker;