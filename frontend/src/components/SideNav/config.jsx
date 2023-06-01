import Room from "../Live/Room";

const user = JSON.parse(localStorage.getItem("user"));
const teacher = JSON.parse(localStorage.getItem("teacher"));

const navConfig = [
  {
    title: 'Home',
    path: '/',
  },
  {
     title: 'Profile',
     path: '/profile',
   },
  // {
  //   title: 'Change Password',
  //   path: '/user/chage-password',
  // },
 {
    title: 'Course',
    path: '/teacher/course-list',
  },
//  {
//     title: 'Go Live',
//     path: '/create-live/',
//   },
{
  title: 'Go Live',

},
  {
    title: 'logout',
  
  },
]

export default navConfig;
