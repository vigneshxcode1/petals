import React from "react";
import Navbar from "../componets/Navbar/Navbar.jsx";
import CardSlider from "../componets/Product/Cardslider.jsx";
import Bestseller from "../componets/Product/slidercard/Bestseller.jsx";
import Zcommunity from "../componets/Product/slidercard/Z-communtity.jsx";
import Corosol from "../componets/Product/corosol/Corolsol.jsx";
import "../App.css";
import Footer from "../componets/footer/footdetails.jsx";
// import Product from '../componets/Product/Product.jsx'
import Testamonial from "./Testimonial/Testamonial.jsx";
import Gallery from "./gallery/Gallery.jsx";
import BannerPage from "../componets/Product/slidercard/BannerPage.jsx";

import About from "./About.jsx";

import Whyas from "./Whyas.jsx";

const Home = () => {
  return (
    <>
      <Navbar />


      {/* 
      <Corosol /> */}
      {/* <img src={titleimg} className="titleimg"alt="Logo" /> */}

      <BannerPage />

        <Bestseller />

     <Whyas/>


      <Zcommunity />

      <About />

     
    
      
       <CardSlider />


      <Testamonial />

      <br />
      <Gallery />

      <Footer />
    </>
  );
};

export default Home;
