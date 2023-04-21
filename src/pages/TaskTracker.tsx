import { Button, Container, Grid, Stack, IconButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
      <button onClick={signOut} className="signout-btn">Sign Out
          <AccountCircleIcon sx={{marginLeft: "3px"}}/>
      </button>
      <Grid container spacing={4} mt={1}>
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