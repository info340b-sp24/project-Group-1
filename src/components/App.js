import React from 'react';
import {Routes, Route} from 'react-router-dom';
// import Home from './Home';
import { Messenger } from './Messenger';
//import PostListing from './PostListing';
// import UserListings from './UserListings';

export default function App() {
  return (
    <div>
      <Routes>
        {/* <Home /> */}
        <Messenger />
        {/* <PostListing /> */}
        {/* <UserListings /> */}
      </Routes>
    </div>
  );
}
