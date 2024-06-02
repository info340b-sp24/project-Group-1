import React from 'react';
import { Link } from 'react-router-dom'

function ListingCard({listing}) {

  return (
    // <div key={listing.id} className="item">
    //   <img src={listing.image} alt={listing.title} />
    //   <p className="title">{listing.title}</p>
    //   <p className="price">{listing.price}</p>
    //   <p className="location">{listing.location}</p>
    // </div>
    <div className="item">
      <Link to={`/item-details/${listing.id}`}>
        <img src={listing.image} alt={listing.title} />
        <p className="title">{listing.title}</p>
      </Link>
      <p className="price">{listing.price}</p>
      <p className="location">{listing.location}</p>
    </div>
  )
}

export function Listings(props) {
  const { items } = props;

  const listingCards = items.map((listing) => (
    <ListingCard key={listing.id} listing={listing}/>
  ));

  return (
    <div className="items-container">
      {listingCards}
    </div>
  )
}