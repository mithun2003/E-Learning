import React, { useEffect } from 'react'
import WhishlistHome from '../components/WishList/WhishlistHome'
import ResponsiveAppBar from '../components/Navbar/Navbar';
import WhishList from '../components/WishList/WhishList';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

const WhishlistPage = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#C1D3DF";
      }, []);
  return (
    <div>
        <ResponsiveAppBar/>
        <WhishlistHome/>
        <WhishList/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default WhishlistPage