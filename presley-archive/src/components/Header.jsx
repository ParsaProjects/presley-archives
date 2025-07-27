import { useState } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import './Header.css';

function Header () {
  const location = useLocation();
  
  // Hide banner on /shop and /archived (with or without trailing slash)
  const hideBanner =
    location.pathname === "/shop" ||
    location.pathname === "/archived" ||
    location.pathname === "/archived/" ||
    location.pathname.startsWith("/info/") ||
    location.pathname.startsWith("/styling") ||
    location.pathname.startsWith("/product");

  const [open, setOpen] = useState(false);

  return (
    <>
      <header>
        
          <img
            src="https://i.postimg.cc/7YC1HvYT/Untitled-design.png"
            alt="logo"
            className="logo"
            style={{ cursor: "pointer" }}
          />
        
        {/* Hamburger button for mobile nav */}
        <button className={`nav-toggle${open ? ' open' : ''}`} onClick={() => setOpen(!open)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        {/* Desktop navigation */}
        <nav className="navbar desktop-nav">
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "active-nav-link" : undefined}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={({ isActive }) => isActive ? "active-nav-link" : undefined}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/archived" className={({ isActive }) => isActive ? "active-nav-link" : undefined}>
                Archived
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "active-nav-link" : undefined}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/styling" className={({ isActive }) => isActive ? "active-nav-link" : undefined}>
                Style bundles
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* Mobile side-navbar */}
        <nav className={`side-navbar${open ? ' open' : ''}`}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? "active-side-link" : undefined}
                onClick={() => setOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) => isActive ? "active-side-link" : undefined}
                onClick={() => setOpen(false)}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/archived/"
                className={({ isActive }) => isActive ? "active-side-link" : undefined}
                onClick={() => setOpen(false)}
              >
                Archived
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => isActive ? "active-side-link" : undefined}
                onClick={() => setOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/styling"
                className={({ isActive }) => isActive ? "active-side-link" : undefined}
                onClick={() => setOpen(false)}
              >
                Style bundles
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      {/* Backdrop for mobile nav */}
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)}></div>}
      {!hideBanner && (
        <div className="banner-container">
          <img
            src="https://i.imgur.com/f9gL5bi.jpg"
            alt="banner"
            className="banner"
          />
        </div>
      )}
    </>
  );
}

export default Header;