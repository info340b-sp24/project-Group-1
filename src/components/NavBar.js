import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNavigation } from './NavScript';
import '../style.css';

const NavBar = ({ searchQuery, setSearchQuery, currentUser }) => {
  const { isMenuOpen, toggleMenu } = useNavigation();
  const navigate = useNavigate();

  const SignOutButton = ({ currentUser }) => {
    if (currentUser.userId) {
      return <button className="menu">Sign Out</button>;
    }
    return null;
  };

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
          <SignOutButton currentUser={currentUser} />
        </div>
      </nav>
      {isMenuOpen && (
        <div className="side-menu">
          <div className="menu-items">
            <Link to="/" className="menu" onClick={toggleMenu}>Home</Link>
            <Link to="/messenger" className="menu" onClick={toggleMenu}>My Messages</Link>
            <Link to="/post-listing" className="menu" onClick={toggleMenu}>Post Listings</Link>
            <Link to="/user-listings" className="menu" onClick={toggleMenu}>My Profile</Link>
            <SignOutButton currentUser={currentUser} />
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;