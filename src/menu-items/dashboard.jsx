// assets
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: <GridViewOutlinedIcon/>,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
