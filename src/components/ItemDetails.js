import React, { useState, useEffect } from 'react';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { useParams, useNavigate } from 'react-router-dom';
import nullListing from '../data/nullListing.json';

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

export default function ItemDetails({ currentUser }) {
  const { itemId } = useParams();
  const [listing, setListing] = useState(nullListing);
  const navigate = useNavigate();

  const { currentImageIndex, handlePrevImage, handleNextImage } = useImageCarousel(
    listing ? listing.images : []
  );

  const storage = getStorage();
  const db = getDatabase();
  const listingRef = dbRef(db, `listings/${itemId}`);

  useEffect(() => {
    const unsubscribe = onValue(listingRef, async (snapshot) => {
      const data = snapshot.val();
      const imagePaths = Object.values(data.images);

      const imageUrls = await Promise.all(
        imagePaths.map(async (image) => {
          const imageRef = storageRef(storage, `listingImages/${image}`);
          const url = await getDownloadURL(imageRef);
          return url;
        })
      );

      data.images = imageUrls;
      setListing(data);
    });

    return () => unsubscribe();
  }, [listingRef, storage]);

  const handleSendMessage = () => {
    if (!currentUser) {
      console.error('No currentUser available');
      return;
    }

    console.log('Dispatching event with details:', {
      itemTitle: listing.title,
      sellerId: listing.sellerId,
      listingId: itemId,
      buyerId: currentUser.userId,
      currentUser: currentUser
    });

    const event = new CustomEvent('createNewChat', {
      detail: {
        itemTitle: listing.title,
        sellerId: listing.sellerId,
        listingId: itemId,
        buyerId: currentUser.userId,
        currentUser: currentUser
      }
    });
    window.dispatchEvent(event);
    navigate('/messenger');
  };

  return (
    <div className="item-details-container">
      <div className="image-carousel">
        <button onClick={handlePrevImage}>&#8249;</button>
        <div className="image-container">
          <img src={listing.images[currentImageIndex]} alt={listing.title} />
        </div>
        <button onClick={handleNextImage}>&#8250;</button>
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
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
      </div>
    </div>
  );
}
