import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Home from '../components/Home/Home'
import Courses from '../components/Courses/Courses'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import LiveList from '../components/Live/LiveList'
import axios from '../axios'

const HomePages = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#C1D3DF";
  }, []);

  const [live, setLive] = useState([]);

  useEffect(() => {
    axios.get('/live/')
      .then((response) => {
        setLive(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Navbar/>
      <Home/>
      <Courses/>
      {live.length !== 0 && <LiveList live={live} />}
      <Contact/>
      <Footer/>
    </div>
  );
}

export default HomePages;
