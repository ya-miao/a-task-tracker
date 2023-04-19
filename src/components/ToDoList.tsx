import { Box, Card, CardHeader, CardContent, Stack, Typography, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import "./ToDoList.css";
import { TransitionProps } from '@mui/material/transitions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@mui/icons-material/Add';

import React, { useEffect, useState } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../graphql/queries';

import * as mutations from '../graphql/mutations';
import { GraphQLQuery } from '@aws-amplify/api';
import { CreateTodoInput, CreateTodoMutation, DeleteTodoInput, DeleteTodoMutation, UpdateTodoInput, UpdateTodoMutation } from '../API';

import awsmobile from "../aws-exports";
Amplify.configure(awsmobile);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ToDoList = () => {

  const [ todos, setTodos ] = useState<any>([]);

  const fetchTodos = async () => {
    try {
      const todoData: any = await API.graphql(graphqlOperation(listTodos))
      const todos: any = todoData.data.listTodos.items
      console.log('todos: ');
      console.log(todos);
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  const addTodo = async (form: any) => {
      try {
      console.log('Trying...')
      const newTodo = await API.graphql<GraphQLQuery<CreateTodoMutation>>(
        graphqlOperation(mutations.createTodo, { input: form })
      );
      console.log('Succeeded!');
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  const deleteTodo = async (id: any) => {
    try {
      console.log('Trying...')
      await API.graphql<GraphQLQuery<DeleteTodoMutation>>({ 
        query: mutations.deleteTodo, 
        variables: { input: {id: id } }
      });
      //
      console.log('Succeeded!');
    } catch (err) {
      console.log('error deleting todo:', err)
    }
  }

  const editTodo = async () => {
    try {
      console.log('Trying...')
      const updatedTodo = await API.graphql<GraphQLQuery<UpdateTodoMutation>>({ 
        query: mutations.updateTodo, 
        variables: { input: {
          id: '7788e2ce-7fb3-4314-b8c9-cf91d2e8bcf7',
          title: 'Feed the dog',
          description: '0.5 cup of dry food',
        } }
      });
      console.log('Succeeded!');
    } catch (err) {
      console.log('error updating todo:', err)
    }
  }
  
  useEffect(() => {
    fetchTodos();
  }, []);

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
    setForm({
      title: "",
      description: "",
      status: "",
      dueDate: "",
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: value
    })
  };

  // TESTING
  useEffect(() => {
    console.log('form: ');
    console.log(form);
  }, [form])

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
            <TextField className="input" id="standard-basic" label="Title" variant="standard" name="title" onChange={handleInputChange}/>
            <TextField className="input" id="standard-basic" label="Description" variant="standard" name="description" onChange={handleInputChange}/>
            <TextField className="input" id="standard-basic" label="Status" variant="standard" name="status" onChange={handleInputChange}/>
            <TextField className="input" id="standard-basic" label="Due Date" variant="standard" name="dueDate" onChange={handleInputChange}/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={() => {
            addTodo(form);
            setOpen(false);
          }}>Add</Button>
        </DialogActions>
      </Dialog>
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ margin: "4px" }}>
             {todos?.map((todo: any, index: any) => (
              <Box sx={{ margin: "10px" }} key={index}>
                <Stack direction="row" justifyContent="space-between" spacing={10} alignItems="flex-start">
                  <Stack direction="column">
                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>{todo?.title}</Typography>
                    <Typography sx={{ fontSize: '14px' }}>{todo?.description}</Typography>
                    <Button size="small">{todo?.status}</Button>
                  </Stack>
                  <Stack direction="column">
                    <Typography sx={{ fontWeight: 'bold' }}>Date</Typography>
                    <Typography>{todo?.dueDate}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={
                      () => {
                        deleteTodo(todo?.id);
                      }
                    }>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
             ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
};

export default ToDoList;