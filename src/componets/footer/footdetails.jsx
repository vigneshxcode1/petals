import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg"


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-col">
          <div className="footer-logo">
            <img
              src={logo}
              alt="Muthu's Petals Logo"
              className="footer-logo-img"
            />
            <h2 className="footer-logo-text">MUTHU'S PETALS</h2>
          </div>

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
          <p>Email: <a href="mailto:muthuspetals@gmail.com"> muthuspetals@gmail.com</a></p>
          <p>Phone: <a href="tel:+916381181527">+91 6381181527</a></p>
          <p><Link to="/contact">Social Media</Link></p>
        </div>


        <div className="footer-col">
          <h3>social media</h3>
          <p> <a href="https://www.instagram.com/?hl=en">Instagram</a></p>
          <p> <a href="https://www.facebook.com/profile.php?id=61579168031168">facebook</a></p>
          <p> <a href="https://www.youtube.com/@MuthusPetals">Youtube</a></p>

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