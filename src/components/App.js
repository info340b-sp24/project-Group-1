import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './style.css'
import Home from './Home';
import Messenger from './Messenger';
import PostListing from './PostListing';
import UserListings from './UserListings';

export default function App() {
  const [messages, setMessages] = useState([
    { id: '1', username: 'Chris', text: 'I am good with that price', liked: false }
  ]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const likeMessage = (index) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages[index].liked = !newMessages[index].liked;
      return newMessages;
    });
  };

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/messenger"
          element={<Messenger messages={messages} addMessage={addMessage} likeMessage={likeMessage} />}
        />
        <Route path="/post-listing" element={<PostListing />} />
        <Route path="/user-listings" element={<UserListings />} />
        <Route path="*" element={<Home />} /> {/* Catch-all route for undefined paths */}
      </Routes>
  );
}
