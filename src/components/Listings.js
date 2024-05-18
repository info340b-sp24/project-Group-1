import React from 'react';

function ListingCard({listing}) {
  return (
    <div key={listing.id} className="item">
      <img src={listing.image} alt={listing.title} />
      <p className="title">{listing.title}</p>
      <p className="price">{listing.price}</p>
      <p className="location">{listing.location}</p>
    </div>
  )
}

export function Listings(props) {
  const items = props.items
  return (
    <div className="items-container">
      {items.map((listing) => (
        <ListingCard listing={listing}/>
      ))}
    </div>
  )
}