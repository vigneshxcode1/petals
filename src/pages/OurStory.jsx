import React from 'react';
import Navbar from '../componets/Navbar/Navbar';
import Footer from '../componets/footer/footdetails';
import About from './About';

const OurStory = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: 'calc(100vh - 300px)' }}>
        <About />
      </div>
      <Footer />
    </>
  );
};

export default OurStory;
