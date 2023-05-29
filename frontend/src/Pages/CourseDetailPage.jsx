import React from 'react'
import ResponsiveAppBar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import CoursesDetailedView from '../components/CoursesView/CoursesDetailedView'
import Contact from '../components/Contact/Contact'


const CourseDetailPage = () => {
  return (
    <div style={{backgroundColor:"#C1D3DF"}}>
        <ResponsiveAppBar/>
        <CoursesDetailedView/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default CourseDetailPage