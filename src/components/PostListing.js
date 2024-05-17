import React, { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default function PostListing() {
  const [condition, setCondition] = useState("");

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  return (
    <>
      <NavBar />
      <main>
    
        <section className="all-items">
          <h2>Post an Item</h2>
          <div className="items-container">
            <div className="item">
              <img src="/img/textbook.jpg" alt="Cover photo of textbook" />
            </div>
            <div className="item">
              <div className="add-photo" role="button" aria-label="Add more photos">
              <span>+</span>
              <p>Add photo</p>
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
          <form className="form-container">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" placeholder="For example: Brand, model, color" />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="text" id="price" />
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
    <Footer />
    </>
  )
}
