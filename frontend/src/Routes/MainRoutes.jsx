import React from "react";
import {  Route, Routes } from "react-router-dom";
import Signup from "../components/Signup/Signup";
import Activate from "../components/Signup/Activate";
import HomePages from "../Pages/HomePages";
import Login from "../components/Login/Login";

// import Signup from "../components/Signup/Signup";
import DashboardLayout from "../components/Admin/layouts/dashboard";
import UserPage from "../components/Admin/pages/UserPage";
import LoginPage from "../components/Admin/pages/LoginPage";
import DashboardAppPage from "../components/Admin/pages/DashboardAppPage";
import AdminProtectedRoutes from "../utils/AdminProtectedRoutes";
import AdminPublicRoutes from "../utils/AdminPublicRoutes";
import ProtectedRoute from "../utils/ProtectedRoute";
import PublicRoute from "../utils/PublicRoute";
import Profile from "../components/Profile/Profile";
import Register from "../components/Teacher/TeacherRegister/Register";
import RequestTeacher from "../components/Admin/pages/RequestTeacher";
import RequestTeacherDetail from "../components/Admin/pages/RequestTeacherDetails";
import TeacherPage from "../components/Admin/pages/TeacherPage";
import SideNav from "../components/SideNav/Sidenav";
import CatergoryPage from "../components/Admin/pages/CategoryPage";
import CoursesPage from "../components/Admin/pages/CoursesPage";
import CourseDetail from "../components/Admin/pages/CourseDetail";
import CourseDetailPage from "../Pages/CourseDetailPage";
import CoursePlay from "../Pages/CoursePlay";
import CourseList from "../components/Add Course/CourseList";
import CourseDetails from "../components/Add Course/CourseDetails";
import WhishList from "../components/WishList/WhishList";

const MainRoutes = () => {
  return (
    <div>
      {/* <Router> */}
      <Routes>
        <Route exact path="/" element={<HomePages />} />
        <Route exact path="/course/detail/:id" element={<CourseDetailPage />} />
        <Route exact path="/activate/:uid/:token" element={<Activate />} />
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<SideNav />}>
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/teacher/course-list" element={<CourseList />} />
            <Route path="courses/course-detail/:id" element={<CourseDetails/>} />
          </Route>
          <Route exact path="/teacher/register" element={<Register />} />
          <Route exact path="/whishlist" element={<WhishList />} />
          <Route exact path="/course/:course_id/:courseName/:chapter_id" element={<CoursePlay />} />
        </Route>
      </Routes>
      <Routes>
        <Route element={<AdminProtectedRoutes />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<DashboardAppPage />} />
            <Route path="/admin/user" element={<UserPage />} />
            <Route path="/admin/teacher" element={<TeacherPage />} />
            <Route path="/admin/courses" element={<CoursesPage/>} />
            <Route path="/admin/courses/course-detail/:id" element={<CourseDetail/>} />
            <Route path="/admin/request/teacher" element={<RequestTeacher />} />
            <Route
              path="/admin/request/teacher/:id"
              element={<RequestTeacherDetail />}
            />
            <Route path="/admin/category" element={<CatergoryPage />} />
          </Route>
        </Route>
        <Route element={<AdminPublicRoutes />}>
          <Route path="/admin/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default MainRoutes;
