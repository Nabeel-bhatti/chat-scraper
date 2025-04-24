// import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
// assets
import { DashboardOutlined} from '@ant-design/icons'
import GridViewIcon from '@mui/icons-material/GridView';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
const icons = {
  GridViewIcon,
  ChatBubbleOutlineOutlinedIcon
}
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
      icon: icons.GridViewIcon,
      breadcrumbs: false
    },
    {
      id: 'messages',
      title: 'Messages',
      type: 'item',
      url: '/messages',
      icon: icons.ChatBubbleOutlineOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
