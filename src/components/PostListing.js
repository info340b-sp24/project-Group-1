import React, { useState } from 'react';

export default function PostListing({ addNewListing }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [image, setImage] = useState(null);

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
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
      location,
      price: `$${price}`,
      condition,
      phoneNumber,
      image: URL.createObjectURL(image),
    };

    addNewListing(newListing);
    // Reset form fields
    setTitle('');
    setLocation('');
    setPrice('');
    setCondition('');
    setPhoneNumber('');
    setImage(null);
  };

  const handleAddTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInput = (e) => {
    setInputTag(e.target.value);
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
                placeholder="For example: Brand, model, color"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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

            <div className="form-group">
              <label htmlFor="condition">Condition:</label>
              <select id="condition" value={condition} onChange={handleConditionChange}>
                <option value="">Select condition</option>
                <option value="New/Never Opened">New/Never Opened</option>
                <option value="Barely Used">Barely Used</option>
                <option value="Moderately Used">Moderately Used</option>
                <option value="Very Used">Very Used</option>
              </select>
            </div>

            <div>
              <input
              type="text"
              value={inputTag}
              onChange={handleTagInput}
              placeholder="Add a tag"
              />
              <button onClick={handleAddTag}>Add Tag</button>
              <div>
                {tags.map(tag => (
                  <span key={tag}>
                    {tag} <button onClick={() => handleRemoveTag(tag)}>x</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" />
            </div>

            <div className="buttons">
              <button type="submit" className="post-button">Post</button>
              <button type="button" className="cancel-button">Cancel</button>
            </div>
          </form>
        </section>
      </main>
    </>
  )
}
