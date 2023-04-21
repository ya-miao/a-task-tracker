import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import e from "express";

interface TaskDialogProps {
  userId: any,
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

  const handleTimeChange = (data: any) => {
    if (data) {
      let monthLength = (data.getMonth()).toString().length;
      let dateLength = (data.getDate()).toString().length;
      let date = dateLength === 1 ? "0" + data.getDate() : data.getDate();
      let month = monthLength === 1 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1);
      let year = data.getFullYear();
      setForm((state) => ({
        ...state,
        dueDate: month + '/' + date + '/' + year,
      }));
    }
  }

  useEffect(() => {
    selectedTask && setForm({
      title: selectedTask.title,
      description: selectedTask.description,
      status: selectedTask.status,
      dueDate: selectedTask.dueDate,
    });

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
          <TextField defaultValue={selectedTask?.title} label="Task" variant="outlined" name="title" onChange={handleInputChange}/>
          <TextField defaultValue={selectedTask?.description} label="Description" variant="outlined" name="description" onChange={handleInputChange} />
          <Box >
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                defaultValue={selectedTask?.status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value='Not started'>Not started</MenuItem>
                <MenuItem value='In progress'>In progress</MenuItem>
                <MenuItem value='Complete'>Complete</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {selectedTask ?
              <DatePicker
                value={new Date(selectedTask?.dueDate)}
                label="Due Date"
                format="MM/dd/yyyy"
                onChange={handleTimeChange}
              />
              :
              <DatePicker
                minDate={new Date()}
                label="Due Date"
                format="MM/dd/yyyy"
                onChange={handleTimeChange}
              />}
          </LocalizationProvider>
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
            setSelectedTask(null);
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
            setSelectedTask(null);
          }}>Add</Button>
        }
      </DialogActions>
    </Dialog>
  )
};

export default TaskDialog;