import React from 'react';
import { Listings } from './Listings';
import items from '../data/items.json';

export default function Home({ searchQuery }) {

  const filteredItems = items.filter((item) => {
    //TODO: filter based on item object attributes string matching or having string from search query
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

  return (
    <>
      <main>
        <section className="all-items">
          <h2>Items Near You</h2>
            <Listings items={filteredItems}/>
        </section>
      </main>
    </>
  );
}

