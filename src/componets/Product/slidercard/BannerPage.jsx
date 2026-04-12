import React from "react";
import "./Banner.css";

const BannerPage = () => {
  return (
    <section className="hero">
      {/* LEFT CONTENT */}
      <div className="hero-left">
        <p className="eyebrow">Limited Time Offer</p>
        <p className="hero-brand">Muthu's Petals</p>

        <h1 className="hero-h1">
          <span className="flat">Flat</span>
          <span className="num">15</span>
          <span className="sym">%</span>
          <span className="off">Off</span>
        </h1>

        <p className="hero-sub">
          {/* <strong>+ Get your Freebie on orders above ₹549.</strong> */}
          <br />
          Shop Now &amp; Nourish Your Hair &amp; Skin Naturally with
          toxin-free botanical ingredients.
        </p>

        <div className="hero-btns">
          <a href="/products" className="btn-fill">View Products</a>
          <a href="/ingredients" className="btn-outline">Our Ingredients</a>
        </div>

        <div className="trust-row">
          <span className="trust-pill"><span className="dot"></span>Toxin Free (Naturally derived ingredients)</span>
          <span className="trust-pill"><span className="dot"></span>Cruelty Free (Eco Conscious)</span>
          <span className="trust-pill"><span className="dot"></span>Paraben or Sulfats free</span>
          <span className="trust-pill"><span className="dot"></span>Dermatologist Tested</span>
          <span className="trust-pill"><span className="dot"></span>Made With Love And Care</span>
        </div>
      </div>

      {/* RIGHT — PRODUCT VISUAL */}
      <div className="hero-right">
        <div className="hero-mono">MP</div>
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>

        {/* spinning offer badge */}
        <div className="offer-badge">
          <div className="offer-badge-inner">
            <span className="big">15%</span>
            <span className="sm">OFF</span>
          </div>
        </div>

        {/* decorative product bottles */}
        <div className="bottles">
          <div className="bottle b1">
            <span className="bottle-lbl">Anti Hair Fall Serum</span>
            <span className="bottle-brand">Muthu's</span>
          </div>
          <div className="bottle b2">
            <span className="bottle-lbl">Hair Oil</span>
            <span className="bottle-brand">Muthu's</span>
          </div>
          <div className="bottle b3">
            <span className="bottle-lbl">Anti Dandruff Shampoo</span>
            <span className="bottle-brand">Muthu's</span>
          </div>
          <div className="bottle b4">
            <span className="bottle-lbl">Conditioner</span>
            <span className="bottle-brand">Muthu's</span>
          </div>
          <div className="bottle b5">
            <span className="bottle-lbl">Scalp Tonic</span>
            <span className="bottle-brand">Muthu's</span>
          </div>
          <div className="bottle b6">
            <span className="bottle-lbl">Hair Mask</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerPage;