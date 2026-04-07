import React from "react";
import "../slidercard/Banner.css";

const BannerPage = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h2 className="brand">MUTHU'S PETALS</h2>

        <h1 className="headline">
          Limited Time Offer <br />
          <span>Shop Now & Nourish Your Hair & Skin Naturally!</span>
        </h1>

        <a href="/products" className="cta-btn">
          View More..
        </a>
      </div>
    </section>
  );
};

export default BannerPage;