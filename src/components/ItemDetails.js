import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useImageCarousel = (images) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return { currentImageIndex, handlePrevImage, handleNextImage };
};

export default function ItemDetails({ listings }) {
  const { itemId } = useParams();
  const [listing, setListing] = useState(null);

  const { currentImageIndex, handlePrevImage, handleNextImage } = useImageCarousel(
    listing ? listing.images : []
  );

  useEffect(() => {
    const foundListing = listings.find((listing) => listing.id === parseInt(itemId));
    setListing(foundListing);
  }, [itemId, listings]);

  if (!listing) {
    return null;
  }

  return (
    <div className="item-details-container">
      <div className="image-carousel">
        <button onClick={handlePrevImage}>&#8249;</button>
        <div className="image-container">
          <img src={listing.images[currentImageIndex]} alt={listing.title} />
        </div>
        <button onClick={handleNextImage}>&#8249;</button>
      </div>
      <div className="item-info">
        <h2>{listing.title}</h2>
        <p className="price">{listing.price}</p>
        <p className="location">{listing.location}</p>
        <div className="seller-info">
          <p>Seller: {listing.sellerUsername}</p>
          <p>Rating: {listing.sellerRating}</p>
        </div>
        <p className="description">{listing.description}</p>
        <div className="buttons">
          <button>Buy</button>
          <button>Rent</button>
          <button>Send Message</button>
        </div>
      </div>
    </div>
  );
}