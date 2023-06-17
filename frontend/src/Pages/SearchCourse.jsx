import React, { useEffect } from 'react'
import ResponsiveAppBar from '../components/Navbar/Navbar'
import AllCourse from '../components/AllCourses/AllCourses'
import Courses from '../components/Courses/Courses';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

const SearchCourse = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#C1D3DF";
      }, []);
  return (
    <>
    <ResponsiveAppBar/>
    <AllCourse/>
    <Courses search={true}/>
    <Contact/>
    <Footer/>
    </>
  )
}

export default SearchCourse