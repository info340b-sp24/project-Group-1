import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNavigation } from './NavScript';
import '../style.css';

const NavBar = ({ searchQuery, setSearchQuery }) => {
  const { isMenuOpen, toggleMenu } = useNavigation();
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/?search=${searchQuery}`);
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <header>
      <nav>
        <div className="left-group">
          <span className="menu-icon" onClick={toggleMenu}>&#9776;</span>
          <h1 className="logo">
            <Link to="/">UW MarketPlace</Link>
          </h1>
        </div>
        <div className="middle-group">
          <form className="search-bar" onChange={handleSearchChange} onSubmit={handleSearch}>
            <button type="submit" className="search-icon">
              <i className="fa fa-search"></i>
            </button>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
        </div>
        <div className="right-group">
          <Link to="/" className="menu">Home</Link>
          <Link to="/messenger" className="menu">My Messages</Link>
          <Link to="/post-listing" className="menu">Post Listings</Link>
          <Link to="/user-listings" className="menu">My Profile</Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;