import React, { useEffect, useState } from 'react';

import { Box, Button, Card, CardHeader, CardContent, Chip, Grid, IconButton, Paper, Stack, Typography, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import TaskDialog from "./TaskDialog";
import Sidebar from './Sidebar';

import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { GraphQLQuery, GraphQLSubscription } from '@aws-amplify/api';
import { CreateTodoInput, CreateTodoMutation, DeleteTodoInput, DeleteTodoMutation, OnCreateTodoSubscription, OnDeleteTodoSubscription, OnUpdateTodoSubscription, UpdateTodoInput, UpdateTodoMutation } from '../API';

import awsmobile from "../aws-exports";
import { width } from '@mui/system';
Amplify.configure(awsmobile);

const ToDoList = () => {

  const [open, setOpen] = useState(false);

  const [todos, setTodos] = useState<any>([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const sortData = () => {
    setTodos(todos.sort((a:any, b:any) => {
      if (a.title < b.title) {
        return -1;
      }
    })
    )
    console.log(todos, "calling from here")
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const fetchTodos = async () => {
    try {
      const todoData: any = await API.graphql(graphqlOperation(listTodos))
      const todos: any = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  const addTodo = async (taskInput: any) => {
    try {
      const newTodo = await API.graphql<GraphQLQuery<CreateTodoMutation>>(
        graphqlOperation(mutations.createTodo, { input: taskInput })
      );
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTodo = async (taskId: any) => {
    try {
      await API.graphql<GraphQLQuery<DeleteTodoMutation>>({
        query: mutations.deleteTodo,
        variables: { input: { id: taskId } }
      });
    } catch (err) {
      console.log(err)
    }
  }

  const editTodo = async (taskId: any, taskInput: any) => {
    try {
      const updatedTodo = await API.graphql<GraphQLQuery<UpdateTodoMutation>>({
        query: mutations.updateTodo,
        variables: {
          input: {
            id: taskId,
            ...taskInput
          }
        }
      });
    } catch (err) {
      console.log(err)
    }
  }

  const subCreate = API.graphql<GraphQLSubscription<OnCreateTodoSubscription>>(
    graphqlOperation(subscriptions.onCreateTodo)
  ).subscribe({
    next: ({ provider, value }) => {
      fetchTodos();
    },
    error: (error) => console.warn(error)
  });

  const subUpdate = API.graphql<GraphQLSubscription<OnUpdateTodoSubscription>>(
    graphqlOperation(subscriptions.onUpdateTodo)
  ).subscribe({
    next: ({ provider, value }) => {
      fetchTodos();
    },
    error: (error) => console.warn(error)
  });

  const subDelete = API.graphql<GraphQLSubscription<OnDeleteTodoSubscription>>(
    graphqlOperation(subscriptions.onDeleteTodo)
  ).subscribe({
    next: ({ provider, value }) => {
      fetchTodos();
    },
    error: (error) => console.warn(error)
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <TaskDialog openDialog={open} setOpenDialog={setOpen} onAddTask={addTodo} onEditTask={editTodo} selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Card variant='outlined' sx={{ padding: 2, border: '1px solid black' }}>
            <Typography variant='h3' sx={{ textAlign: "center", marginBottom: 2 }} fontFamily={"'Bungee Shade', cursive"}>My Tasks</Typography>
            <CardHeader title={
              <Stack alignContent='center' direction='row' justifyContent='space-between'>
                <FormControl sx={{ width: "30%" }}>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    label="Sort By"
                  >
                    <MenuItem value='Title' onClick={sortData}>Title</MenuItem>
                    <MenuItem value='In progress'>Status</MenuItem>
                    <MenuItem value='Complete'>Due Date</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip title="Add New Task">
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ borderRadius: "55rem" }}
                    color='info'
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Stack>} />
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  {todos?.map((todo: any, index: any) => (
                    <Paper key={index} className='task-container' sx={{ padding: 2, mb: 2 }}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Stack direction="column" justifyContent="flex-start" spacing={1}>
                            <Typography variant='h5' >{todo?.title}</Typography>
                            <Typography variant='body2'>{todo?.description}</Typography>
                            <Chip label={todo?.status} variant='filled' sx={{ width: 120 }} color={todo?.status === 'Complete' ? 'success' : todo?.status === 'In progress' ? 'warning' : 'error'} />
                          </Stack>
                        </Grid>
                        <Grid item xs={4}>
                          <Stack direction="column">
                            <Typography variant='overline'>Due Date: {todo?.dueDate}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={2}>
                          <Stack direction="row" spacing={1} className='showOnHover'>
                            <IconButton onClick={
                              () => {
                                setSelectedTask(todo);
                                setOpen(true);
                              }
                            }>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={
                              () => {
                                deleteTodo(todo?.id);
                              }
                            }>
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Sidebar taskList={todos} />
        </Grid>
      </Grid>
    </>
  )
};

export default ToDoList;