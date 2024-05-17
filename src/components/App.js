import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Home} from './Home';
import { Messenger } from './Messenger';
import { PostListing } from './PostListing';
import { UserListings } from './UserListings';

export default function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Messenger />}/>
        {/* <Route path="Messenger" element={<Messenger />}/> */}
        <Route path="PostListing" element={<PostListing />}/>
        <Route path="UserListings" element={<UserListings />}/>
      </Routes>
    </div>
  );
}
