import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface TaskDialogProps {
  openDialog: any,
  setOpenDialog: any,
  onAddTask: any,
  onEditTask: any,
  selectedTask: any,
  setSelectedTask: any,
};

const TaskDialog = ({ openDialog, setOpenDialog, onAddTask, onEditTask, selectedTask, setSelectedTask }: TaskDialogProps) => {

  const [status, setStatus] = React.useState('');
  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
    setForm({
      ...form,
      status: event.target.value as string
    })
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: "",
  });

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedTask(null);
    setForm({
      title: "",
      description: "",
      status: "",
      dueDate: "",
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    })
  };

  useEffect(() => {
    selectedTask && setForm({
      title: selectedTask.title,
      description: selectedTask.description,
      status: selectedTask.status,
      dueDate: selectedTask.dueDate,
    });;
  }, [selectedTask]);

  return (
    <Dialog
      open={openDialog}
      fullWidth={true}
      onClose={handleClose}
    >
      <DialogTitle>{selectedTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <Stack spacing={1} sx={{ m: 2 }}>
          <TextField defaultValue={selectedTask?.title} label="Task" variant="outlined" name="title" onChange={handleInputChange} />
          <TextField defaultValue={selectedTask?.description} label="Description" variant="outlined" name="description" onChange={handleInputChange} />
            <Box >
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value='Not started'>Not started</MenuItem>
                <MenuItem value='In progress'>In progress</MenuItem>
                <MenuItem value='Complete'>Complete</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField defaultValue={selectedTask?.dueDate} label="Due Date" variant="outlined" name="dueDate" onChange={handleInputChange} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        {selectedTask ?
          <Button onClick={() => {
            onEditTask(selectedTask?.id, form);
            setOpenDialog(false);
            setForm({
              title: "",
              description: "",
              status: "",
              dueDate: "",
            });
          }}>Edit</Button>
          :
          <Button onClick={() => {
            onAddTask(form);
            setOpenDialog(false);
            setForm({
              title: "",
              description: "",
              status: "",
              dueDate: "",
            });
          }}>Add</Button>
        }
      </DialogActions>
    </Dialog>
  )
};

export default TaskDialog;