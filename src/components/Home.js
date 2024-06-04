import React, { useEffect, useState } from 'react';
import { Listings } from './Listings';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function Home({ searchQuery }) {
  const [listings, setListings] = useState([]);
  const db = getDatabase();
  const listingsRef = ref(db, 'listings');

  useEffect(() => {
    const unsubscribe = onValue(listingsRef, (snapshot) => {
      const dbListings = snapshot.val();
      const dbListingsWithId = Object.keys(dbListings).reduce((acc, listingId) => {
        if (dbListings[listingId].status === 'available') {
          acc.push({ ...dbListings[listingId], id: listingId });
        }
        return acc;
      }, []);
      setListings(dbListingsWithId);
    });

    return () => unsubscribe();
  }, []);

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
    <main>
      <section className="all-items">
        <Listings items={filteredItems} header="Items Near You" />
      </section>
    </main>
  );
}
