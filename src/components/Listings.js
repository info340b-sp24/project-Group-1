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
  const { items } = props.items

  const listingCards = items.map((listing) => (
    <ListingCard key={listing.id} listing={listing}/>
  ))

  return (
    <div className="items-container">
      {listingCards}
    </div>
  )
}