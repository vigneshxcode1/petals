import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const navItems = [
  { label: "Best Sellers", href: "/products" },
  { label: "New Launches", href: "/products", children: ["Hair Care New", "Skin Care New", "Body Care New"] },
  { label: "Hair Care",    href: "#", children: ["Shampoo", "Conditioner", "Hair Oil", "Hair Mask"] },
  { label: "Skin Care",    href: "#", children: ["Moisturizer", "Serum", "Face Wash", "Sunscreen"] },
  { label: "Ingredients",  href: "#", children: ["Onion", "Bhringraj", "Aloe Vera", "Rosehip"] },
  { label: "Combos",       href: "#", children: ["Hair Combos", "Skin Combos", "Gift Sets"] },
  { label: "Shop By Concern", href: "#", children: ["Hair Fall", "Dandruff", "Dry Skin", "Anti-Ageing"] },
  { label: "Contact Us",   href: "#", children: ["Support","FAQ"] },
];

const TICKER_MSGS = [
  "GET FREEBIE ON ORDERS ABOVE ₹549",
  "EXTRA ₹20 OFF ON PREPAID ORDERS",
  "FREE SHIPPING ABOVE ₹499",
  "100% TOXIN FREE INGREDIENTS",
];

/* ── Desktop dropdown item ── */
function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <li
      className="nav-item"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a href={item.href} className="nav-a">
        {item.label}
        {item.children && <span className="arr">▾</span>}
      </a>
      {item.children && open && (
        <div className="nav-drop">
          {item.children.map((c) => <a key={c} href="#">{c}</a>)}
        </div>
      )}
    </li>
  );
}

/* ── Mobile accordion item ── */
function DrawerItem({ item, onClose }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="drawer-item">
      <button
        className="drawer-link"
        onClick={() => item.children ? setOpen((v) => !v) : onClose()}
      >
        <span>{item.label}</span>
        {item.children && (
          <span className={`drawer-arr ${open ? "drawer-arr--open" : ""}`}>▾</span>
        )}
      </button>
      {item.children && open && (
        <div className="drawer-sub">
          {item.children.map((c) => (
            <a key={c} href="#" className="drawer-sub-link" onClick={onClose}>{c}</a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Navbar ── */
export default function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);

  /* lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (menuOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const tickerDouble = [...TICKER_MSGS, ...TICKER_MSGS];

  return (
    <>
      {/* ── Ticker ── */}
      <div className="ticker">
        <div className="ticker-inner">
          {tickerDouble.map((msg, i) => <span key={i}>{msg}</span>)}
        </div>
      </div>

      {/* ── Navbar ── */}
      <nav className="navbar">
        {/* Left: desktop links */}
        <ul className="nav-links">
          {navItems.slice(0, 4).map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </ul>

        {/* Centre: logo */}
        <Link to="/" className="logo">
          Muthu's Petals
          <small>Nourishing Hair & Skin Care</small>
        </Link>

        {/* Right: icons + hamburger */}
        <div className="nav-right">
          <Link to="/profile" className="icon-btn" aria-label="Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          <Link to="/cart" className="icon-btn cart-wrap" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-dot">{cartCount}</span>}
          </Link>

          <Link to="/products" className="nav-cta hide-mobile">Shop Now</Link>

          {/* Hamburger — mobile only */}
          <button
            className="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`hb ${menuOpen ? "hb--open" : ""}`} />
            <span className={`hb ${menuOpen ? "hb--open" : ""}`} />
            <span className={`hb ${menuOpen ? "hb--open" : ""}`} />
          </button>
        </div>
      </nav>

      {/* ── Overlay ── */}
      <div
        className={`drawer-overlay ${menuOpen ? "drawer-overlay--active" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ── Drawer ── */}
      <aside
        ref={drawerRef}
        className={`drawer ${menuOpen ? "drawer--open" : ""}`}
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="drawer-head">
          <span className="drawer-logo">Muthu's Petals</span>
          <button className="drawer-close" onClick={close} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav className="drawer-nav">
          {navItems.map((item) => (
            <DrawerItem key={item.label} item={item} onClose={close} />
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="drawer-footer">
          <Link to="/profile" className="drawer-foot-link" onClick={close}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            ABout
          </Link>
          <Link to="/products" className="drawer-cta" onClick={close}>Shop Now</Link>
        </div>
      </aside>
    </>
  );
}