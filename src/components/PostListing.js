import React, { useState } from 'react';

export default function PostListing({ addNewListing }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
      id: Date.now(),
      title,
      category,
      description,
      price: `$${price}`,
      image: URL.createObjectURL(image),
    };

    addNewListing(newListing);
    setTitle('');
    setCategory('');
    setDescription('');
    setPrice('');
    setImage(null);
  };


  return (
    <>
      <main>
        <section className="all-items">
          <div className="items-container">
            <div className="item">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Uploaded" />
              ) : (
                <img src="/img/textbook.jpg" alt="Cover of textbook" />
              )}
            </div>
            <div className="item">
              <div className="add-photo">
                <label htmlFor="image-upload">
                  <span>+</span>
                  <p>Add photo</p>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="all-items">
          <div className="photo-gallery">
            <div className="photo">
              <img src="/img/textbook.jpg" alt="Book Cover" />
            </div>
            <div className="photo">
              <img src="/img/textbook.jpg" alt="Physical Science" />
            </div>
            <div className="photo">
              <img src="/img/textbook.jpg" alt="Physical Science Book Cover" />
            </div>
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