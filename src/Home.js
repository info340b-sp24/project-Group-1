export default function Home() {
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
              <input type="text" placeholder="Search"></input>
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
  <h2>Items Near You</h2>
  <div class="items-container">
      <div class="item">
          <img src="/img/textbook.jpg" alt="Textbook"></img>
          <p class="title">PEARSON SCIENCE TEXTBOOK</p>
          <p class="price">$90</p>
          <p class="location">University District</p>
      </div>
      <div class="item">
          <img src="/img/textbook.jpg" alt="Textbook"></img>
          <p class="title">PEARSON SCIENCE TEXTBOOK</p>
          <p class="price">$90</p>
          <p class="location">University District</p>
      </div>
      <div class="item">
          <img src="/img/textbook.jpg" alt="Textbook"></img>
          <p class="title">PEARSON SCIENCE TEXTBOOK</p>
          <p class="price">$90</p>
          <p class="location">University District</p>
      </div>
      <div class="item">
          <img src="/img/textbook.jpg" alt="Textbook"></img>
          <p class="title">PEARSON SCIENCE TEXTBOOK</p>
          <p class="price">$90</p>
          <p class="location">University District</p>
      </div>
  </div>
</section>
</main>
}

