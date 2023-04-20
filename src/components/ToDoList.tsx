import React, { useEffect, useState } from 'react';

import { Box, Card, CardHeader, CardContent, Stack, Typography } from "@mui/material";
import { Button } from "@mui/material";
// import "./ToDoList.css";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@mui/icons-material/Add';

import TaskDialog from "./TaskDialog";

import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { GraphQLQuery, GraphQLSubscription } from '@aws-amplify/api';
import { CreateTodoInput, CreateTodoMutation, DeleteTodoInput, DeleteTodoMutation, UpdateTodoInput, UpdateTodoMutation } from '../API';
import { OnCreateTodoSubscription, OnUpdateTodoSubscription, OnDeleteTodoSubscription } from '../API';

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
      console.log('error creating todo:', err)
    }
  }

  const deleteTodo = async (taskId: any) => {
    try {
      await API.graphql<GraphQLQuery<DeleteTodoMutation>>({
        query: mutations.deleteTodo,
        variables: { input: { id: taskId } }
      });
    } catch (err) {
      console.log('error deleting todo:', err)
    }
  }

  const editTodo = async (taskId: any, taskInput: any) => {
    try {
      console.log('Trying...')
      const updatedTodo = await API.graphql<GraphQLQuery<UpdateTodoMutation>>({
        query: mutations.updateTodo,
        variables: {
          input: {
            id: taskId,
            ...taskInput
          }
        }
      });
      console.log('Succeeded!');
    } catch (err) {
      console.log('error updating todo:', err)
    }
  }

  const subCreate = API.graphql<GraphQLSubscription<OnCreateTodoSubscription>>(
    graphqlOperation(subscriptions.onCreateTodo)
  ).subscribe({
    next: ({ provider, value }) => {
      console.log({ provider, value });
      fetchTodos();
    },
    error: (error) => console.warn(error)
  });

  const subUpdate = API.graphql<GraphQLSubscription<OnUpdateTodoSubscription>>(
    graphqlOperation(subscriptions.onUpdateTodo)
  ).subscribe({
    next: ({ provider, value }) => {
      console.log({ provider, value });
      fetchTodos();
    },
    error: (error) => console.warn(error)
  });

  const subDelete = API.graphql<GraphQLSubscription<OnDeleteTodoSubscription>>(
    graphqlOperation(subscriptions.onDeleteTodo)
  ).subscribe({
    next: ({ provider, value }) => {
      console.log({ provider, value });
      fetchTodos();
    },
    error: (error) => console.warn(error)
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Card variant='outlined'>
      <TaskDialog openDialog={open} setOpenDialog={setOpen} onAddTask={addTodo} onEditTask={editTodo} selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
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
                    <IconButton color="primary" onClick={
                      () => {
                        console.log('EDIT!');
                        setSelectedTask(todo);
                        setOpen(true);
                      }
                    }>
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