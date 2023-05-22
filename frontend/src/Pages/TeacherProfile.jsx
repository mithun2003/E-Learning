import React, { useEffect } from 'react'
import TeacherProfileView from '../components/Teacher/TeacherProfile/TeacherProfileView'
import ResponsiveAppBar from '../components/Navbar/Navbar'
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Courses from '../components/Courses/Courses';

const TeacherProfile = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#C1D3DF";
      }, []);
  return (
    <div>
        <ResponsiveAppBar/>
        <TeacherProfileView/>
        <Courses isTeacher={true}/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default TeacherProfile