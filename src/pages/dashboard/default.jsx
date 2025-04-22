import { Button, Stack } from '@mui/material';
// import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  return (
    <Stack size={12} bgcolor={'#2463EB'} color={'#fff'} p={4} gap={1.5} borderRadius={2}>
      <Typography variant="h3">Welcome back, Alex!</Typography>
      <Typography >You have 5 unread messages and 3 tasks requiring attention today.</Typography>
      <Stack direction="row" spacing={2} >
        <Button sx={{
          backgroundColor: "#fff", color: "#477ae8", textAlign: "center", "&:hover": {
            backgroundColor: "#fff",
            color: "#477ae8",
          },
        }} >
          View Messages
        </Button>
        <Button sx={{
          backgroundColor: "#fff", color: "#477ae8", textAlign: "center", "&:hover": {
            backgroundColor: "#fff",
            color: "#477ae8",
          },
        }} >
          Manage Task
        </Button>
      </Stack>
    </Stack>
  );
}
