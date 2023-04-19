import { Box, Card, CardHeader, CardContent, Stack, Typography, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { positions } from '@mui/system';
import "./ToDoList.css";
import { TransitionProps } from '@mui/material/transitions';
import { useState } from "react";
import React from "react";
import { createTodo } from '../graphql/mutations'
import { API } from "aws-amplify";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const handleSubmit = async () => {
  await API.graphql({
    query: createTodo,
    variables: {
      input: {
        title: "",
        description: "",
        status: "",
        dueDate: "",
      }
    }
  })
}

const ToDoList = () => {

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card variant='outlined'>
      <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
        <CardHeader title='My Tasks' />
        <Button
          variant="contained"
          sx={{ height: "2.5rem", alignSelf: "center", marginRight: "10px" }}
          onClick={handleClickOpen}>
          Add Task
          <AddIcon />
        </Button>
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth={true}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Input New Task Info"}</DialogTitle>
        <DialogContent>
          <Stack>
            <TextField className="input" id="standard-basic" label="Title" variant="standard" />
            <TextField className="input" id="standard-basic" label="Description" variant="standard" />
            <TextField className="input" id="standard-basic" label="Status" variant="standard" />
            <TextField className="input" id="standard-basic" label="Due Date" variant="standard" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>

      <CardContent>
        <Stack spacing={4}>
          <Box>
            <div className="task-container">
              <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                <h2>Task 1</h2>
                <h5>Date</h5>
                <Box>
                  <div className="showOnHover">
                    <EditIcon />
                    <DeleteIcon />
                  </div>
                </Box >
              </Box>
              <h5>Decription</h5>
              <button>Status</button>
            </div>
          </Box>
          <Box>
            <div className="task-container">
              <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                <h2>Task 1</h2>
                <h5>Date</h5>
                <Box>
                  <div className="showOnHover">
                    <EditIcon />
                    <DeleteIcon />
                  </div>
                </Box >
              </Box>
              <h5>Decription</h5>
              <button>Status</button>
            </div>
          </Box>
          <Box>
            <div className="task-container">
              <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                <h2>Task 1</h2>
                <h5>Date</h5>
                <Box>
                  <div className="showOnHover">
                    <EditIcon />
                    <DeleteIcon />
                  </div>
                </Box >
              </Box>
              <h5>Decription</h5>
              <button>Status</button>
            </div>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
};

export default ToDoList;
{/* <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Task 1" />
              <FormControlLabel control={<Checkbox />} label="Task 2" />
              <FormControlLabel control={<Checkbox />} label="Task 3" />
            </FormGroup> */}