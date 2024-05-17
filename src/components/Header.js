import React from 'react';

const Header = () => (
  <header>
    <nav>
      <div className="left-group">
        <span className="menu-icon">&#9776;</span>
        <h1 className="logo"><a href="index.html">UW MarketPlace</a></h1>
      </div>
      <div className="middle-group">
        <form className="search-bar">
          <button type="button" className="search-icon"><i className="fa fa-search"></i></button>
          <input type="text" placeholder="Search" />
        </form>
      </div>
      <div className="right-group">
        <a href="post-listing.html" className="menu">List an Item</a>
        <a href="my-listings.html" className="menu">My Listings</a>
        <a href="messages.html" className="menu">My Messages</a>
      </div>
    </nav>
  </header>
);

export default Header;
