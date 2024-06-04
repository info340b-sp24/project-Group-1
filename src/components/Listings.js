import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

function ListingCard({ listing }) {
  const storage = getStorage();
  const pathRef = storageRef(storage, `listingImages/${listing.images[0]}`);
  const [imageUrl, setImageUrl] = useState(null);

  const db = getDatabase();
  const locationRef = dbRef(db, `users/${listing.sellerId}/location`);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getDownloadURL(pathRef).then((url) => setImageUrl(url));
  }, [pathRef]);

  useEffect(() => {
    const unsubscribe = onValue(locationRef, (snapshot) => {
      setLocation(snapshot.val());
    });

    return () => unsubscribe();
  }, [locationRef]);

  return (
    <div className="item">
      <Link to={`/item-details/${listing.id}`}>
        <img src={imageUrl} alt={listing.title} />
        <p className="title">{listing.title}</p>
        <p className="price">{listing.price}</p>
        <p className="location">{location}</p>
      </Link>
    </div>
  );
}

export function Listings({ items, header }) {
  // Chunk items into groups of 3 for each carousel item
  const chunkedItems = [];
  for (let i = 0; i < items.length; i += 5) {
    chunkedItems.push(items.slice(i, i + 5));
  }

  return (
    <div>
      <h2>{header}</h2>
      <Carousel className="carousel-custom">
        {chunkedItems.map((itemGroup, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-item-container">
              {itemGroup.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
