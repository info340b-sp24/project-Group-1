import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from './NavScript';
import '../../style.css';

const NavBar = () => {
  const { isMenuOpen, toggleMenu } = useNavigation();

  return (
    <>
      <header>
        <nav>
          <div className="left-group">
            <div className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle Menu">
              <span className="menu-icon">&#9776;</span>
            </div>
            <h1 className="logo">
              <Link to="/">UW MarketPlace</Link>
            </h1>
          </div>
          <div className="middle-group">
            <form className="search-bar">
              <button type="button" className="search-icon">
                <i className="fa fa-search"></i>
              </button>
              <input type="text" placeholder="Search" />
            </form>
          </div>
          <div className="right-group">
            <Link to="/">Home</Link>
            <Link to="/Messenger">My Messages</Link>
            <Link to="/PostListing">Post Listings</Link>
            <Link to="/UserListings">My Listings</Link>
          </div>
        </nav>
      </header>
      <div className={`menu-tab ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/Messenger" onClick={toggleMenu}>
              My Messages
            </Link>
          </li>
          <li>
            <Link to="/PostListing" onClick={toggleMenu}>
              Post Listing
            </Link>
          </li>
          <li>
            <Link to="/UserListings" onClick={toggleMenu}>
              Listings
            </Link>
          </li>
        </ul>
        <div className='footer'>
          <footer>
            <p>&copy; 2024 UW MarketPlace</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default NavBar;