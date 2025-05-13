import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchOverlay from '../components/SearchOverlay';
import { ShopContext } from '../context/ShopContext';

const AppLayout = ({ children }) => {
  const { showSearch } = useContext(ShopContext);

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />

      {showSearch && <SearchOverlay />}

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default AppLayout;
