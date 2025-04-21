// material-ui
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';

// project imports
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
// import MainCard from 'components/MainCard';
// import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
// import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
// import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
// import SaleReportCard from 'sections/dashboard/default/SaleReportCard';
// import OrdersTable from 'sections/dashboard/default/OrdersTable';

// assets
// import GiftOutlined from '@ant-design/icons/GiftOutlined';
// import MessageOutlined from '@ant-design/icons/MessageOutlined';
// import SettingOutlined from '@ant-design/icons/SettingOutlined';

// import avatar1 from 'assets/images/users/avatar-1.png';
// import avatar2 from 'assets/images/users/avatar-2.png';
// import avatar3 from 'assets/images/users/avatar-3.png';
// import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
     
    
    </Grid>
  );
}
