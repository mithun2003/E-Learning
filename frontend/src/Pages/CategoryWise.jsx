import React, { useEffect } from 'react'
import ResponsiveAppBar from '../components/Navbar/Navbar'

import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import CategoryWise from '../components/CategoryWise/CategoryWise';
import CatCourseList from '../components/CategoryWise/CatCourseList';

const Category = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#C1D3DF";
      }, []);
  return (
    <>
    <ResponsiveAppBar/>
    <CategoryWise/>
    <CatCourseList/>
    <Contact/>
    <Footer/>
    </>
  )
}

export default Category