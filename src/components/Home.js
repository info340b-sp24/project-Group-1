import React from 'react';
import { Listings } from './Listings';
import items from '../data/items.json';

export default function Home({ searchQuery, listings }) {

  //TODO: filter based on item object attributes string matching or having string from search query
  const filteredItems = items.filter((item) => {
    if (searchQuery) {
      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const listingElements = listings.map((listing) => (
    <div key={listing.id} className="item">
      <img src={listing.image} alt={listing.title} />
      <p className="title">{listing.title}</p>
      <p className="price">{listing.price}</p>
      <p className='location'>{listing.location}</p>
    </div>
  ));

  return (
    <>
      <main>
        <section className="all-items">
          <h2>Items Near You</h2>
            <div className='item-container'>
            {listingElements}
            <Listings items={filteredItems}/>
            </div>
        </section>
      </main>
    </>
  );
}

