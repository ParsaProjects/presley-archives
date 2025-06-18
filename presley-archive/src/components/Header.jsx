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
    location.pathname.startsWith("/product");

  const [open, setOpen] = useState(false);

  return (
    <>
      <header>
        <img
          src="https://i.imgur.com/Ij441cq.png"
          alt="logo"
          className="logo"
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
          </ul>
        </nav>
        {/* Mobile side-navbar */}
        <nav className={`side-navbar${open ? ' open' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
            </li>
            <li>
              <Link to="/archived/" onClick={() => setOpen(false)}>Archived</Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setOpen(false)}>About</Link>
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