import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, deleteObject } from 'firebase/storage';

export default function PostListing({ addNewListing }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const db = getDatabase();
  const storage = getStorage();

  useEffect(() => {
    const listingRef = ref(db, 'listings');
    onValue(listingRef, (snapshot) => {
      const listings = snapshot.val();
      if (listings) {
        const listingImages = Object.values(listings).map((listing) => listing.images);
        setImages(listingImages.flat());
      }
    });
  }, [db]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const imageRef = storageRef(storage, `listingImages/${file.name}`);
        await uploadBytes(imageRef, file);
        return file.name;
      })
    );
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newListing = {
      title,
      category,
      description,
      price: `$${price}`,
      images,
    };

    const listingRef = ref(db, 'listings');
    await push(listingRef, newListing);

    setTitle('');
    setCategory('');
    setDescription('');
    setPrice('');
    setImages([]);
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

  const handleDeleteImage = async (imageName) => {
    const imageRef = storageRef(storage, `listingImages/${imageName}`);
    await deleteObject(imageRef);
    setImages((prevImages) => prevImages.filter((image) => image !== imageName));
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
                    src={`https://firebasestorage.googleapis.com/v0/b/your-project.appspot.com/o/listingImages%2F${images[currentImageIndex]}?alt=media`}
                    alt={`Uploaded ${currentImageIndex}`}
                  />
                ) : (
                  <img src="/img/photo.jpeg" alt="Upload Photo Here" />
                )}
              </div>
              <button onClick={handleNextImage}>&#8250;</button>
            </div>
            <div className="item">
              <label htmlFor="image-upload">
                <img src="/img/photo.jpeg" alt="Upload Photo Here" />
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
                  src={`https://firebasestorage.googleapis.com/v0/b/(put our project website here).appspot.com/o/listingImages%2F${image}?alt=media`}
                  alt={`Uploaded ${index}`}
                />
                <button onClick={() => handleDeleteImage(image)}>Delete</button>
              </div>
            ))}
          </div>
        </section>
        <section className="all-items">
          <div className="photo-instructions">
            <p><span className="edit-icon" aria-hidden="true"></span> Tap photo to edit</p>
            <p><span className="rearrange-icon" aria-hidden="true"></span> Double tap photo to rearrange</p>
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
                <option value="New/Never Opened">Electronics</option>
                <option value="Barely Used">Study Materials & Textbooks</option>
                <option value="Moderately Used">Dorm & Apartment Essentials</option>
                <option value="Very Used">Sports & Fitness</option>
                <option value="Very Used">Hobbies & Entertainment</option>
                <option value="Very Used">Healthy & Beauty</option>
                <option value="Very Used">Transportation</option>
                <option value="Very Used">Other</option>
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
              <button type="submit" className="post-button">Post</button>
              <button type="button" className="cancel-button">Cancel</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}