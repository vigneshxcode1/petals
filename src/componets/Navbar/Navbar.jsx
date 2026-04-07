import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

import cartimg from "../../componets/images/add-to-cart.png";
import titleimg from "../images/logo.jpg";

import "./Navbar.css";


function BasicExample() {
  return (
    <Navbar
    collapseOnSelect
    expand="lg"
    className="bg-body-tertiary toggle"
    id="bg-body-tertiary"
  >
    <Navbar.Toggle
      aria-controls="responsive-navbar-nav"
      className="toggle"
    />
    <Navbar.Collapse id="responsive-navbar-nav" className="toggle">
      <Nav className="me-auto tog">
        <Nav.Link href="/products">TOP COLLECTIONS</Nav.Link>
        <Nav.Link href="/anioversized"> ARRIVALS</Nav.Link>
        <NavDropdown title="more collections" id="collapsible-nav-dropdown">
        
          <NavDropdown.Item href="/animicollections">
          product1
          </NavDropdown.Item>
          <NavDropdown.Item href="/caroversized">
          product2
          </NavDropdown.Item>
          <NavDropdown.Item href="/movieoversized">
          product3
          </NavDropdown.Item>
          <NavDropdown.Item href="/sportoversized">
          product4
          </NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown>
        <Nav.Link href="/login">LOGIN</Nav.Link>

        <Nav.Link href="/profile">profile</Nav.Link>
      </Nav>

     

    </Navbar.Collapse>
    <Navbar.Brand href="/" className="headtitle">
    <div id="headtitle">
       <img className="titleimg" src={titleimg}></img>
    </div>
     
    </Navbar.Brand>

    <Link to={"/cart"}>
      <Navbar.Brand>
        <img src={cartimg} alt="cart" className="cart-img" />
      </Navbar.Brand>
    </Link>
  </Navbar>
  );
}

export default BasicExample;
