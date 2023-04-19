import { Box, Card, CardHeader, CardContent, Stack, Typography, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { positions } from '@mui/system';
import "./ToDoList.css";
import { TransitionProps } from '@mui/material/transitions';
import { useState } from "react";
import React from "react";
import { createTodo } from '../graphql/mutations'
import { API } from "aws-amplify";
import { takeCoverage } from "v8";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

  const [tasklist, setTaskList] = useState<{ title: string; description: string; status: string; dueDate: string; }[]>([]);

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
    setTaskList([...tasklist, form]);
    console.log(form)
    setForm({
      title: "",
      description: "",
      status: "",
      dueDate: "",
    });
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: value
    })
  };


  return (
    <Card variant='outlined'>
      <CardHeader title='My Tasks' />

      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Task
      </Button>

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
            <TextField className="input" id="standard-basic" label="Title" variant="standard" name="title" onChange={handleInputChange}/>
            <TextField className="input" id="standard-basic" label="Description" variant="standard" name="description" onChange={handleInputChange}/>
            <TextField className="input" id="standard-basic" label="Status" variant="standard" name="status" onChange={handleInputChange}/>
            <TextField className="input" id="standard-basic" label="Due Date" variant="standard" name="dueDate" onChange={handleInputChange}/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>

      <CardContent>
        <Stack spacing={1}>
          <Box sx={{ margin: "4px" }}>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Task 1" />
              <FormControlLabel control={<Checkbox />} label="Task 2" />
              <FormControlLabel control={<Checkbox />} label="Task 3" />
              {tasklist.map((task, index) => (
                <Box sx={{ margin: "10px" }}>
                  <Stack direction="row" justifyContent="space-between" spacing={10} alignItems="flex-start">
                    <Stack direction="column">
                      <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>{task.title}</Typography>
                      <Typography sx={{ fontSize: '14px' }}>{task.description}</Typography>
                      <Typography>{task.status}</Typography>
                    </Stack>
                    <Stack direction="column">
                      <Typography sx={{ fontWeight: 'bold' }}>Date</Typography>
                      <Typography>{task.dueDate}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </FormGroup>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
};

export default ToDoList;