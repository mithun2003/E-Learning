
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/admin/',
  //   icon: <DashboardIcon/>
  // },
  {
    title: 'User',
    path: '/admin/user',
    icon: <PersonIcon/>,
  },
  {
    title: 'Teacher',
    path: '/admin/teacher',
    icon: <PersonIcon/>,
  },
  {
    title: 'Catergory',
    path: '/admin/category',
    icon: <CategoryIcon/>,
  },
  {
    title: 'Courses',
    path: '/admin/courses',
    icon: <SchoolIcon/>,
  },
  {
    title: 'Requests for Teacher',
    path: '/admin/request/teacher',
    icon: <NotificationsIcon/>,
    // icon: icon('ic_user'),
  },
  // {
  //   title: 'product',
  //   path: '/admin',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/admin',
  //   icon: icon('ic_blog'),
  // },
  {
    title: 'logout',
    // path: '/admin/login',
    icon: <LogoutIcon/>,
    // icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
