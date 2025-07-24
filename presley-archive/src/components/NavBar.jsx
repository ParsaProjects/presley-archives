import { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="nav-toggle" onClick={() => setOpen(!open)}>
        <span className="nav-icon">&#9776;</span>
      </button>
      <nav className={`side-navbar${open ? ' open' : ''}`}>
        <ul>
          <li className='underline'><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li className='underline'><Link to="/shop" onClick={() => setOpen(false)}>Shop</Link></li>
          <li className='underline'><Link to="/archived/" onClick={() => setOpen(false)}>Archived</Link></li>
          <li className='underline'><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
          <li className='underline'><Link to="/styling" onClick={() => setOpen(false)}>Styling</Link></li>
        </ul>
      </nav>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)}></div>}
    </>
  );
}

export default NavBar;