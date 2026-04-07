import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-col">
          <h2 className="logo">MUTHU'S PETALS</h2>
          <p className="tagline">
            Natural care for your hair & skin with premium quality products.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Shop</h3>
          <ul>
            <li><Link to="/products">Shampoo</Link></li>
            <li><Link to="/products">Soap</Link></li>
            <li><Link to="/products">Face Serum</Link></li>
            <li><Link to="/products">Lip Balm</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3>Contact</h3>
          <p>Email: <a href="mailto:sample@gmail.com">sample@gmail.com</a></p>
          <p>Phone: <a href="tel:+910000999988">+91 0000999988</a></p>
          <p><Link to="/contact">Social Media</Link></p>
        </div>

        {/* Info */}
        <div className="footer-col">
          <h3>Info</h3>
          <p><Link to="/about">About Us</Link></p>
          <p>Policy & Return</p>
          <p>Shipping Policy</p>
          <p>India | Chennai</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 MUTHU'S PETALS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;