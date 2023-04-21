import { useState, useEffect } from "react";

import { Stack, Typography, Divider, Box } from "@mui/material";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface SidebarProps {
  taskList: any,
}

const Sidebar = ({ taskList } : SidebarProps) => {

  const [ tasksCompleted, setTasksCompleted ] = useState(0);

  useEffect(() =>{
    const numOfCompletedTasks = taskList.filter((item: any) =>
      item?.status === 'Complete'
    ).length;
    setTasksCompleted(numOfCompletedTasks);
  }, [taskList]);

  return (
    <Stack spacing={4}>
      <Divider >TODAY'S DATE</Divider>
        <Typography className = "heading" sx={{ margin: "20px"}} variant="h2" fontFamily={"'Bungee Shade', cursive"}>Wed, March 29 2023</Typography>
      {/*<Divider>View</Divider>
         <Typography>Sort By / Radio buttons</Typography>
        <FormControl>
          <FormLabel>Sort By</FormLabel>
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            defaultValue="due"
            name="radio-buttons-group"
          >
            <FormControlLabel value="due" control={<Radio />} label="Soonest Due" />
            <FormControlLabel value="title" control={<Radio />} label="Title" />
            <FormControlLabel value="status" control={<Radio />} label="Status" />
          </RadioGroup>
        </FormControl> */}
      <Divider>PROGRESS</Divider>
        <Typography className = "heading" variant = "h2" fontFamily={"'Bungee Shade', cursive"}>{tasksCompleted}</Typography>
        <Typography className = "heading" variant = "h6">{tasksCompleted !== 1 ? 'Tasks Completed' : 'Task Completed'}</Typography>
    </Stack>
  )
};

export default Sidebar;