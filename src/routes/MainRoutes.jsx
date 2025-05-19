import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PrivateRoute from '../layout/Auth/PrivateRoute';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Pricing = Loadable(lazy(() => import('pages/component-overview/pricing')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const Messages = Loadable(lazy(() => import('pages/component-overview/messages')));
const Profile = Loadable(lazy(() => import('pages/component-overview/profile')));
const Team = Loadable(lazy(() => import('pages/component-overview/team')));

// render - sample page

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'messages',
      element: <Messages />
    },
    {
      path: 'profile',
      element: <Profile />
    },
    {
      path: 'team',
      element: <Team />
    },
    {
      path: 'pricing',
      element: <Pricing />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    }
  ]
};

export default MainRoutes;
