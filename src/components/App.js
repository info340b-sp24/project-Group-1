import React from 'react';
import { Route, Routes, BrowserRouter, Link} from 'react-router-dom';
import Home from './Home';
import Messenger from './Messenger';
import PostListing from './PostListing';
import UserListings from './UserListings';

export default function App() {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/post-listing" element={<PostListing />} />
          <Route path="/user-listings" element={<UserListings />} />
          <Route path="*" element={<Home />} /> 
        </Routes>
  );
}
