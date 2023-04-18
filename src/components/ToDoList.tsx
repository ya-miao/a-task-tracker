import { Box, Card, CardHeader, CardContent, Stack, Typography } from "@mui/material";

const ToDoList = () => {
  return (
    <Card variant='outlined'>
      <CardHeader title='Some Header' />
      <CardContent>
        <Stack spacing={2}>
          <Typography>
            This is the ToDo list on the right column!
          </Typography>
          <Box>
            A list of radio buttons here
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
};

export default ToDoList;