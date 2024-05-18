import React from 'react';
import listings from '../data/items.json';

export default function Home({ searchQuery }) {
  return (
    <>
      <main>
        <section className="all-items">
          <h2>Items Near You</h2>
          <div className="items-container">
            {listings.map((listing) => (
                <div key={listing.id} className="item">
                  <img src={listing.image} alt={listing.title} />
                  <p className="title">{listing.name}</p>
                  <p className="price">{listing.price}</p>
                  <p className="location">{listing.location}</p>
                </div>
              ))}
            <div className="item">
              <img src="/img/textbook.jpg" alt="Textbook" />
              <p className="title">PEARSON SCIENCE TEXTBOOK</p>
              <p className="price">$90</p>
              <p className="location">University District</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
