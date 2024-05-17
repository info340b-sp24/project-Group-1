import React, { useState } from 'react';
import { Home } from './Home';
import NavBar from './Nav/NavBar';
import { Messenger } from './Messenger';
import { PostListing } from './PostListing';
import { UserListings } from './UserListings';

export default function App(props) {
  const [view, setView] = useState('home');

  return (
    <div className="app">
      <NavBar onNavigate={setView} />
      {view === 'home' && <Home />}
      {view === 'messenger' && <Messenger />}
      {view === 'post-listing' && <PostListing />}
      {view === 'user-listings' && <UserListings />}
    </div>
  );
}