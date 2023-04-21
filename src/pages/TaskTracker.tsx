import { Button, Grid, Stack } from "@mui/material";

import ToDoList from "../components/ToDoList";

import { Auth } from 'aws-amplify';

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
        <ToDoList />
      </Grid>
    </Stack >
  )
};

export default TaskTracker;