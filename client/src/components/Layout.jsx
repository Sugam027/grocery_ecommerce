import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Newsletter from './Newsletter';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
        <Navbar />
        <Toaster />
            <Outlet />
        <Newsletter />
        <Footer />
    </>
  );
};

export default Layout;
