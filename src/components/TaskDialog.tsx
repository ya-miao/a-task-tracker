import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";

interface TaskDialogProps {
  openDialog: any,
  setOpenDialog: any,
  onAddTask: any,
  onEditTask: any,
  selectedTask: any,
  setSelectedTask: any,
};

const TaskDialog = ({ openDialog, setOpenDialog, onAddTask, onEditTask, selectedTask, setSelectedTask }: TaskDialogProps) => {

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
        <Stack>
          <TextField defaultValue={selectedTask?.title} label="Title" variant="standard" name="title" onChange={handleInputChange} />
          <TextField defaultValue={selectedTask?.description} label="Description" variant="standard" name="description" onChange={handleInputChange} />
          <TextField defaultValue={selectedTask?.status} label="Status" variant="standard" name="status" onChange={handleInputChange} />
          <TextField defaultValue={selectedTask?.dueDate} label="Due Date" variant="standard" name="dueDate" onChange={handleInputChange} />
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