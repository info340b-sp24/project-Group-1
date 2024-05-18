import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';



export default function UserListings({ listings }) {
  return (
    <>
        <main>
          <section className="my-items">
            <div className="user-info">
              {/* <img src={car} alt="User Avatar" className="user-avatar" /> */}
              <div className="user-details">
                <h2 className="username">Henry</h2>
                <p className="joined-date">Joined Apr 2024</p>
                <p className="location">Seattle, WA</p>
              </div>
            </div>
            <div className="item-stats">
              <div className="stat">
                <p className="value">1</p>
                <p className="label">Bought</p>
              </div>
              <div className="stat">
                <p className="value">4</p>
                <p className="label">Sold</p>
              </div>
              <div className="stat">
                <p className="value">13</p>
                <p className="label">Followers</p>
              </div>
              <div className="stat">
                <p className="value">1</p>
                <p className="label">Following</p>
              </div>
            </div>
          </section>

          <section className="all-items">
            <h2>My Listings</h2>
            <div className="items-container">
                {listings.map((listing) => (
                  <div key={listing.id} className="item">
                    <img src={listing.image} alt={listing.title} />
                    <p className="title">{listing.title}</p>
                    <p className="price">{listing.price}</p>
                  </div>
                ))}
              <div className="item">
                {/* <img src={chair} alt="Chair" /> */}
                <p className="title">USED CHAIR</p>
                <p className="price">$5</p>
              </div>
              <div className="item">
                {/* <img src={couch} alt="Couch" /> */}
                <p className="title">USED COUCH</p>
                <p className="price">$90</p>
              </div>
              <div className="item">
                {/* <img src={textbook} alt="Textbook" /> */}
                <p className="title">PEARSON SCIENCE TEXTBOOK</p>
                <p className="price">$75</p>
              </div>
              <div className="item">
                {/* <img src={labcoat} alt="Labcoat" /> */}
                <p className="title">USED LABCOAT</p>
                <p className="price">$10</p>
              </div>
            </div>
          </section>

          <section className="sold-items">
            <h2>Sold Items</h2>
            <div className="items-container">
              <div className="item">
                {/* <img src={shirt} alt="Shirt" /> */}
                <p className="title">UW SHIRT</p>
                <p className="price">$15</p>
              </div>
              <div className="item">
                {/* <img src={sweats} alt="Sweats" /> */}
                <p className="title">UW ECON SWEATS</p>
                <p className="price">$60</p>
              </div>
              <div className="item">
                {/* <img src={ipad} alt="Ipad" /> */}
                <p className="title">USED 12TH GEN IPAD</p>
                <p className="price">$90</p>
              </div>
              <div className="item">
                {/* <img src={chair2} alt="papasan chair" /> */}
                <p className="title">USED PAPASAN CHAIR</p>
                <p className="price">$40</p>
              </div>
            </div>
          </section>
        </main>
      </>
  );
}