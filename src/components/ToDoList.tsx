import { Box, Card, CardHeader, CardContent, Stack, Typography, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { TextField, Button} from "@mui/material";
import { positions } from '@mui/system';
import "./ToDoList.css"

const ToDoList = () => {
  return (
    <Card variant='outlined'>
      <CardHeader title ='My Tasks' />
          <TextField className="input" id="standard-basic" label="add a new task..." variant="standard" />
          <Button className="input" variant = "outlined"> Add </Button>
      <CardContent>
        <Stack spacing={1}>
          <Box>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Task 1" />
                <FormControlLabel control={<Checkbox />} label="Task 2" />
                <FormControlLabel control={<Checkbox />} label="Task 3" />
              </FormGroup>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
};

export default ToDoList;