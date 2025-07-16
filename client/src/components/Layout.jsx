import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Newsletter from './Newsletter';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
        <Navbar />
            <Outlet />
        <Newsletter />
        <Footer />
    </>
  );
};

export default Layout;
