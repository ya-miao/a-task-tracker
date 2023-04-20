import React, { useEffect, useState } from 'react';

import { Box, Button, Card, CardHeader, CardContent, Chip, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import TaskDialog from "./TaskDialog";

import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { GraphQLQuery, GraphQLSubscription } from '@aws-amplify/api';
import { CreateTodoInput, CreateTodoMutation, DeleteTodoInput, DeleteTodoMutation, OnCreateTodoSubscription, OnDeleteTodoSubscription, OnUpdateTodoSubscription, UpdateTodoInput, UpdateTodoMutation } from '../API';

import awsmobile from "../aws-exports";
Amplify.configure(awsmobile);

const ToDoList = () => {

  const [open, setOpen] = useState(false);

  const [todos, setTodos] = useState<any>([]);
  const [selectedTask, setSelectedTask] = useState(null);

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
      <Card variant='outlined'>
        <CardHeader title={
          <Stack alignContent='center' direction='row' justifyContent='space-between'>
            <Typography variant='h4'>My Tasks</Typography>
            <Button
              variant="contained"
              onClick={handleClickOpen}>
              <Stack direction='row' justifyContent='space-between' spacing={2}>
                <Typography>Add Task</Typography>
                <AddIcon />
              </Stack>
            </Button>
          </Stack>} />
        <CardContent>
          <Stack spacing={2}>
            <Box>
              {todos?.map((todo: any, index: any) => (
                <Paper sx={{ m: 2 }} key={index} className='task-container'>
                  <Grid container>
                    <Grid item xs={6}>
                      <Stack direction="column" justifyContent="flex-start" sx={{ m: 2 }}>
                        <Typography variant='h6' sx={{ ml: 1  }}>{todo?.title}</Typography>
                        <Typography variant='body2' sx={{ ml: 1 }}>{todo?.description}</Typography>
                        <Chip label={todo?.status} variant='outlined' sx={{ width: 120 }} color={todo?.status === 'Complete' ? 'success' : todo?.status === 'In progress' ? 'warning' : 'error'} />
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack direction="column" sx={{ m: 2 }}>
                        <Typography variant='overline'>Due Date: {todo?.dueDate}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack direction="row" spacing={1} sx={{ m: 2 }} className='showOnHover'>
                        <IconButton color="warning" onClick={
                          () => {
                            setSelectedTask(todo);
                            setOpen(true);
                          }
                        }>
                        <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={
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
    </>
  )
};

export default ToDoList;