import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/logo.jpg";

const navItems = [
  { label: "New Arrivals", href: "/products" },
  { label: "Hair Care",    href: "#" },
  { label: "Skin Care",    href: "#" },
  { label: "Bath & Body",  href: "#" },
  { label: "Our Story",    href: "/about" },
];

const TICKER_MSGS = [
  "Free shipping on orders above ₹499",
  "Extra ₹20 off on prepaid orders",
  "Free gift on orders above ₹549",
  "100% Toxin-free ingredients",
];

/* ── Floral logo icon ── */
const FloralIcon = () => (
  <svg width="22" height="22" viewBox="0 0 40 40" fill="none" className="logo-icon">
    <circle cx="20" cy="12" r="5" fill="#c084d4" opacity="0.85" />
    <circle cx="28" cy="20" r="5" fill="#e8a0f0" opacity="0.75" />
    <circle cx="20" cy="28" r="5" fill="#c084d4" opacity="0.85" />
    <circle cx="12" cy="20" r="5" fill="#e8a0f0" opacity="0.75" />
    <circle cx="20" cy="20" r="4" fill="#fff"    opacity="0.9"  />
    <circle cx="20" cy="20" r="2" fill="#c084d4" />
  </svg>
);

/* ── Desktop dropdown ── */
function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <li
      ref={ref}
      className={`nav-item ${open ? "nav-item--open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a href={item.href} className="nav-a">
        {item.label}
        {item.children && <span className="nav-chevron" aria-hidden="true" />}
      </a>
      {item.children && (
        <div
          className={`nav-drop ${open ? "nav-drop--visible" : ""}`}
          aria-hidden={!open}
        >
          <ul>
            {item.children.map((c) => (
              <li key={c}><a href="#">{c}</a></li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

/* ── Mobile accordion ── */
function DrawerItem({ item, onClose }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="drawer-item">
      <button
        className="drawer-link"
        onClick={() => (item.children ? setOpen((v) => !v) : onClose())}
        aria-expanded={item.children ? open : undefined}
      >
        <span>{item.label}</span>
        {item.children && (
          <svg
            className={`drawer-chevron ${open ? "drawer-chevron--open" : ""}`}
            viewBox="0 0 20 20"
            fill="none"
            width="14"
            height="14"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M5 7.5l5 5 5-5" />
          </svg>
        )}
      </button>
      {item.children && open && (
        <div className="drawer-sub">
          {item.children.map((c) => (
            <a key={c} href="#" className="drawer-sub-link" onClick={onClose}>
              {c}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Icons ── */
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="11" cy="11" r="7" />
    <path d="M16.5 16.5 21 21" />
  </svg>
);

const IconAccount = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconBag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

/* ═══════════════════════════════
   MAIN NAVBAR
═══════════════════════════════ */
export default function Navbar({ cartCount = 0 }) {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const drawerRef = useRef(null);
  const searchRef = useRef(null);

  /* shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body when drawer open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* close drawer on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (menuOpen && drawerRef.current && !drawerRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  /* close search on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (searchOpen && searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  const close = () => setMenuOpen(false);

  /* double ticker messages for seamless loop */
  const tickerDouble = [...TICKER_MSGS, ...TICKER_MSGS];

  return (
    <>
      {/* ── Ticker ── */}
      {/* <div className="ticker" role="marquee" aria-label="Promotions">
        <div className="ticker-track">
          {tickerDouble.map((msg, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-dot" aria-hidden="true">✦</span>
              {msg}
            </span>
          ))}
        </div>
      </div> */}

      {/* ── Navbar ── */}
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar-inner">

          {/* LEFT — Hamburger (mobile) + Logo */}
          <div className="navbar-left">
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

            <Link to="/" className="logo" aria-label="Muthu's Petals – Home">
              <img
                src={logo}
                alt="Muthu's Petals Logo"
                className="logo-img"
              />
              <span className="logo-text">
                Muthu's Petals
                <em className="logo-tagline">Nourishing Hair & Skin Care</em>
              </span>
            </Link>
          </div>

          {/* CENTRE — Nav links (desktop) */}
          <nav className="nav-links" aria-label="Primary navigation">
            <ul>
              {navItems.map((item) => (
                <NavItem key={item.label} item={item} />
              ))}
            </ul>
          </nav>

          {/* RIGHT — Icons */}
          <div className="navbar-right">
            {/* Search */}
          

            <Link to="/profile" className="icon-btn" aria-label="My account">
              <IconAccount />
            </Link>

            <Link
              to="/cart"
              className="icon-btn cart-btn"
              aria-label={`Cart, ${cartCount} items`}
            >
              <IconBag />
              {cartCount > 0 && (
                <span className="cart-badge" aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </header>

      {/* ── Overlay ── */}
      <div
        className={`drawer-overlay ${menuOpen ? "drawer-overlay--on" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer ── */}
      <aside
        ref={drawerRef}
        className={`drawer ${menuOpen ? "drawer--open" : ""}`}
        aria-label="Mobile navigation"
        aria-modal="true"
        role="dialog"
        hidden={!menuOpen}
      >
        {/* Header */}
        <div className="drawer-head">
          <Link to="/" className="drawer-logo" onClick={close}>
            <FloralIcon />
            Muthu's Petals
          </Link>
          <button className="drawer-close" onClick={close} aria-label="Close menu">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              width="18"
              height="18"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="drawer-nav">
          {navItems.map((item) => (
            <DrawerItem key={item.label} item={item} onClose={close} />
          ))}
        </nav>

        {/* Footer */}
        <div className="drawer-footer">
          <div className="drawer-footer-icons">
            <Link
              to="/profile"
              className="drawer-foot-btn"
              onClick={close}
              aria-label="Account"
            >
              <IconAccount />
              <span>Account</span>
            </Link>
            <Link
              to="/cart"
              className="drawer-foot-btn"
              onClick={close}
              aria-label="Cart"
            >
              <IconBag />
              <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
            </Link>
          </div>
          <Link to="/products" className="drawer-cta" onClick={close}>
            Shop Now
          </Link>
        </div>
      </aside>
    </>
  );
}