import React from 'react';
import { Listings } from './Listings';

export default function Home({ searchQuery, listings }) {

  const filteredItems = listings.filter((listing) => {
    if (searchQuery) {
      return (
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <>
      <main>
        <section className="all-items">
          <h2>Items Near You</h2>
            <div className='item-container'>
              <Listings items={filteredItems}/>
            </div>
        </section>
      </main>
    </>
  );
}

