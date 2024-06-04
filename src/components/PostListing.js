import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, remove, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

import Alert from './Alert';


export default function PostListing() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [location, setLocation] = useState(null);

  const [error, setError] = useState(null);

  const isFormValid = title && category && description && price && images.length > 0;

  const user = getAuth();
  const db = getDatabase();
  const storage = getStorage();
  const userRef = ref(db, `users/${user.currentUser.uid}`);
  const draftRef = ref(db, `users/${user.currentUser.uid}/listingDraft`);

  useEffect(() => {
    const unsubscribe = onValue(draftRef, async (snapshot) => {
      const data = snapshot.val();

      console.log(data)
      let imageUrls = [];
      if (data) {
        const imagePaths = Object.values(data);
        const imageKeys = Object.keys(data);
        imageUrls = await Promise.all(
          imagePaths.map(async (image, index) => {
            const imageRef = storageRef(storage, `listingImages/${image}`);
            const url = await getDownloadURL(imageRef);
            return {
              key: imageKeys[index],
              name: image,
              url
            };
          })
        );
      }

      console.log(imageUrls)
      setImages(imageUrls);
    });

    function cleanup() {
      unsubscribe();
    }

    return cleanup;
  }, [db]);

  useEffect(() => {
    const unsubscribe = onValue(userRef, (snapshot) => {
      const user = snapshot.val();
      setLocation(user.location);
    });

    return unsubscribe;
  }, [userRef]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    await Promise.all(
      files.map(async (file) => {
        const imageRef = storageRef(storage, `listingImages/${file.name}`);
        await uploadBytes(imageRef, file);
        await push(draftRef, file.name);
        return file.name;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && category && description && price && images.length > 0) {
      if (location) {
        const newListing = {
          title,
          category,
          description,
          price,
          images: images.map((image) => image.name),
          status: 'available',
          date: new Date().getTime(),
          location,
          sellerId: user.currentUser.uid
        };

        const listingRef = ref(db, 'listings');
        const newListingRef = await push(listingRef, newListing);
        // Delete draft
        await remove(draftRef);
        // Add listingId to user's listings
        const userListingsRef = ref(db, `users/${user.currentUser.uid}/listings`);
        await update(userListingsRef, {
          [newListingRef.key]: true
        });
        setTitle('');
        setCategory('');
        setDescription('');
        setPrice('');
      } else {
        setError('Set location for user');
      }
    } else {
      setError('Missing fields');
    }
  };

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

  const handleDeleteImage = async (imageName, imageKey) => {
    const imageDbRef = ref(db, `users/${user.currentUser.uid}/listingDraft/${imageKey}`);
    const imageStorageRef = storageRef(storage, `listingImages/${imageName}`);
    setImages((prevImages) => prevImages.filter((image) => image.key !== imageKey));
    await remove(imageDbRef);
    console.log(imageStorageRef)
    await deleteObject(imageStorageRef);
  };

  return (
    <>
      <main>
        <section className="all-items">
          <div className="items-container">
            <div className="image-carousel">
              <button onClick={handlePrevImage}>&#8249;</button>
              <div className="image-container">
                {images.length > 0 ? (
                  <img
                    src={images[currentImageIndex].url}
                    alt={`Uploaded ${currentImageIndex}`}
                  />
                ) : (
                  <img src="/img/photo.jpeg" alt="Upload Here" />
                )}
              </div>
              <button onClick={handleNextImage}>&#8250;</button>
            </div>
            <div className="item">
              <label htmlFor="image-upload">
                <img src="/img/photo.jpeg" alt="Upload Here" />
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                multiple
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div className="uploaded-images">
            {images.map((image, index) => (
              <div key={index} className="uploaded-image">
                <img
                  src={image.url}
                  alt={`Uploaded ${index}`}
                />
                <button onClick={() => handleDeleteImage(image.name, image.key)}>Delete</button>
              </div>
            ))}
          </div>
        </section>
        <section className="all-items">
          <div className="photo-instructions">
            <p><span className="edit-icon" aria-hidden="true"></span> Tap photo to edit</p>
          </div>
        </section>
        <section className="all-items">
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="For example: Brand, model, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category of item</label>
              <select id="category" value={category} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Study Materials & Textbooks">Study Materials & Textbooks</option>
                <option value="Dorm & Apartment Essentials">Dorm & Apartment Essentials</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
                <option value="Hobbies & Entertainment">Hobbies & Entertainment</option>
                <option value="Healthy & Beauty">Healthy & Beauty</option>
                <option value="Transportation">Transportation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type="text"
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="For example: Condition of item, color, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>


            <div className="buttons">
              <button type="submit" className="post-button" disabled={!isFormValid}>Post</button>
              <button type="button" className="cancel-button">Cancel</button>
            </div>
            {error && <Alert message={error} />}
          </form>
        </section>
      </main>
    </>
  );
}