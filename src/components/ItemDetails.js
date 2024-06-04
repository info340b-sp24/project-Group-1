import React, { useState, useEffect } from 'react';
import { getDatabase, ref as dbRef, push, onValue, update } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

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

export default function ItemDetails({ listings }) {
  const { itemId } = useParams();
  const [listing, setListing] = useState(nullListing);
  const navigate = useNavigate();

  const { currentImageIndex, handlePrevImage, handleNextImage } = useImageCarousel(
    listing ? listing.images : []
  );

  const storage = getStorage();
  const db = getDatabase();
  const listingRef = dbRef(db, `listings/${itemId}`);

  const user = getAuth();
  const currentUser = user.currentUser;

  useEffect(() => {
    const unsubscribe = onValue(listingRef, async (snapshot) => {
      const data = snapshot.val();
      const imagePaths = Object.values(data.images);

      const imageUrls = await Promise.all(imagePaths.map(async (image) => {
        const imageRef = storageRef(storage, `listingImages/${image}`);
        const url = getDownloadURL(imageRef);
        return url;
      }));

      data.images = imageUrls;
      console.log(data)
      setListing(data);

    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (listing.sellerId) {
      const sellerRef = dbRef(db, `users/${listing.sellerId}`);
      const unsubscribe = onValue(sellerRef, (snapshot) => {
        const sellerData = snapshot.val();
        setListing((prevListing) => ({
          ...prevListing,
          sellerUsername: sellerData.username
        }));
      });

      return unsubscribe;
    }
  }, [listing.sellerId]);

  const handleSendMessage = async () => {
    if (!currentUser) {
      console.error('No currentUser available');
      return;
    }

    const newConversation = {
      buyerId: currentUser.uid,
      sellerId: listing.sellerId,
      listingId: itemId,
      messages: {}
    };

    try {
      const conversationRef = dbRef(db, 'conversations');
      const newConversationRef = await push(conversationRef, newConversation);
      const userConversationsRef = dbRef(db, `users/${currentUser.uid}/conversationIds`);
      await update(userConversationsRef, {
        [newConversationRef.key]: true
      });
      const sellerConversationsRef = dbRef(db, `users/${listing.sellerId}/conversationIds`);
      await update(sellerConversationsRef, {
          [newConversationRef.key]: true
      });
      navigate('/messenger');
    } catch (error) {
      console.error('Error creating new conversation:', error);
    }
  };

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
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
      </div>
    </div>
  );
}