import { Grid, Stack } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
    <Stack sx={{ my: 2 }}>
       <button onClick={signOut} className="signout-btn">Sign Out
          <AccountCircleIcon sx={{marginLeft: "3px"}}/>
      </button>
      <Grid container spacing={4} mt={3}>
        <ToDoList />
      </Grid>
    </Stack >
  )
};

export default TaskTracker;