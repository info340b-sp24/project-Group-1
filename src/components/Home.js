import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <section className="all-items">
          <h2>Items Near You</h2>
          <div className="items-container">
            <div className="item">
              <img src="/img/textbook.jpg" alt="Textbook" />
              <p className="title">PEARSON SCIENCE TEXTBOOK</p>
              <p className="price">$90</p>
              <p className="location">University District</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
