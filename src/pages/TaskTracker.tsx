import { Container, Grid } from "@mui/material";

import Sidebar from "../components/Sidebar";
import ToDoList from "../components/ToDoList";

// Here is the container for the TaskTracker components
const TaskTracker = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <ToDoList />
      </Grid>
      <Grid item xs={4}>
        <Sidebar />
      </Grid>
    </Grid>
  )
};

export default TaskTracker;