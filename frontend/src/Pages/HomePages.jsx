import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Home from '../components/Home/Home'
import Courses from '../components/Courses/Courses'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

const HomePages = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#C1D3DF";
  }, []);
  return (
    <div>
      <Navbar/>
      <Home/>
      <Courses/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default HomePages
