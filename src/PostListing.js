export default function PostListing() {
  return <main>
    <header>
      <nav>
        <div class="left-group">
          <span class="menu-icon">&#9776;</span>
          <h1 class="logo"><a href="index.html">UW MarketPlace</a></h1>
        </div>
        <div class="middle-group">
          <form class="search-bar">
            <button type="button" class="search-icon"><i class="fa fa-search"></i></button>
            <input type="text" placeholder="Search" />
            </form>
        </div>
        <div class="right-group">
          <a href="post-listing.html" class="menu">List an Item</a>
          <a href="my-listings.html" class="menu">My Listings</a>
          <a href="messages.html" class="menu">My Messages</a>
        </div>
      </nav>
    </header>

    <section class="all-items">
      <h2>Post an Item</h2>
      <div class="items-container">
        <div class="item">
          <img src="./img/textbook.jpg" alt="Cover photo of textbook" />
          </div>
        <div class="item">
          <div class="add-photo" role="button" aria-label="Add more photos">
            <span>+</span>
            <p>Add photo</p>
          </div>
        </div>
      </div>
    </section>

    <section class="all-items">
      <div class photo-gallery />"{">"}
      <div class="photo">
        <img src="./img/textbook.jpg" alt="Physical Science Book Cover" />
      </div>
      <div class="photo">
        <img src="./img/textbook.jpg" alt="Physical Science Book Cover" />
      </div>
      <div class="photo">
        <img src="./img/textbook.jpg" alt="Physical Science Book Cover" />
      </div>
  </section>
    <section class="all-items">
      <div class="photo-instructions">
        <p><span class="edit-icon" aria-hidden="true"></span> Tap photo to edit</p>
        <p><span class="rearrange-icon" aria-hidden="true"></span> Double tap photo to rearrange</p>
      </div>
    </section>
    <section class="all-items">
      <form class="form-container">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" placeholder="For example: Brand, model, color" />
        </div>

        <div class="form-group">
          <label for="location">Location</label>
          <input type="text" id="location" />
        </div>

        <div class="form-group">
          <label for="price">Price</label>
          <input type="text" id="price" />
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" />
        </div>

        <div class="buttons">
          <button type="submit" class="post-button">Post</button>
          <button type="button" class="cancel-button">Cancel</button>
        </div>
      </form>
    </section>
</main>
}

