import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

function ListingCard({listing}) {

  const storage = getStorage();
  const pathRef = storageRef(storage, `listingImages/${listing.images.image1}`);
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
      console.log(snapshot.val());
    });

    function cleanup() {
      unsubscribe();
    }
    return cleanup;
  }, [locationRef]);

  return (
    // <div key={listing.id} className="item">
    //   <img src={listing.image} alt={listing.title} />
    //   <p className="title">{listing.title}</p>
    //   <p className="price">{listing.price}</p>
    //   <p className="location">{listing.location}</p>
    // </div>
    <div className="item">
      <Link to={`/item-details/${listing.id}`}>
        <img src={imageUrl} alt={listing.title} />
        <p className="title">{listing.title}</p>
        <p className="price">{listing.price}</p>
        <p className="location">{location}</p>
      </Link>
    </div>
  )
}

export function Listings(props) {
  const { items } = props;

  const listingCards = items.map((listing) => (
    <ListingCard key={listing.id} listing={listing}/>
  ));

  return (
    <div>
      <h2>{props.header}</h2>
      <div className="items-container">
        {listingCards}
      </div>
    </div>
  )
}

