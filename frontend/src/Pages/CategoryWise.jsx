import React, { useEffect } from 'react'
import ResponsiveAppBar from '../components/Navbar/Navbar'
import AllCourse from '../components/AllCourses/AllCourses'
import Courses from '../components/Courses/Courses';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import CategoryWise from '../components/CategoryWise/CategoryWise';

const Category = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#C1D3DF";
      }, []);
  return (
    <>
    <ResponsiveAppBar/>
    <CategoryWise/>
    <Courses all={true}/>
    <Contact/>
    <Footer/>
    </>
  )
}

export default Category