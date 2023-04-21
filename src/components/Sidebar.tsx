import { useState, useEffect } from "react";

import { Stack, Typography, Divider } from "@mui/material";

interface SidebarProps {
  taskList: any,
}

const Sidebar = ({ taskList }: SidebarProps) => {

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const today = new Date();
  const todaysDate = `${dayNames[today.getDay()]}, ${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

  const [tasksCompleted, setTasksCompleted] = useState(0);

  useEffect(() => {
    const numOfCompletedTasks = taskList.filter((item: any) =>
      item?.status === 'Complete'
    ).length;
    setTasksCompleted(numOfCompletedTasks);
  }, [taskList]);

  return (
    <Stack spacing={4} width='60vh' height='100vh'>
      <Divider >TODAY'S DATE</Divider>
      <Typography className="heading" sx={{ margin: "20px" }} variant="h2" fontFamily={"'Bungee Shade', cursive"}>{todaysDate}</Typography>
      <Divider>PROGRESS</Divider>
      <Typography className="heading" variant="h2" fontFamily={"'Bungee Shade', cursive"}>{tasksCompleted}</Typography>
      <Typography className="heading" variant="h6">{tasksCompleted !== 1 ? 'Tasks Completed' : 'Task Completed'}</Typography>
    </Stack>
  )
};

export default Sidebar;