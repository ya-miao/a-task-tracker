import { Stack, Typography, Divider, Box } from "@mui/material";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const Sidebar = () => {
  return (
    <Stack spacing={4}>
      <Divider >TODAY'S DATE</Divider>
        <Typography className = "heading" sx={{ margin: "20px" }} variant="h2">Wed, March 29 2023</Typography>
      <Divider>View</Divider>
        {/* <Typography>Sort By / Radio buttons</Typography> */}
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
        </FormControl>
      <Divider>PROGRESS</Divider>
        <Typography className = "heading" variant = "h2">2</Typography>
        <Typography className = "heading" variant = "h6">Task Completed!</Typography>
    </Stack>
  )
};

export default Sidebar;