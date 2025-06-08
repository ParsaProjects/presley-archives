import NavBar from "./NavBar"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header (){

    return (

        <>
        <header>
            
            <img src="https://i.imgur.com/Ij441cq.png" alt="logo" width={300} height={130} className="logo"/>
            <nav className="navbar">
                <ul className="nav-links">
                    <li><Link to="/" activeClassName="active-nav-link">Home</Link></li>
                    <li><Link to="/shop" activeClassName="active-nav-link">Shop</Link></li>
                    <li><Link to="/archived/" activeClassName="active-nav-link">Archived</Link></li>
                    <li><Link to="/about" activeClassName="active-nav-link">About</Link></li>
                </ul>
            </nav>
            
        </header>
        <div className="banner-container">
            <img src="https://i.imgur.com/f9gL5bi.jpg" alt="banner" className="banner" />
        </div>
        </>
        
    )
}

export default Header