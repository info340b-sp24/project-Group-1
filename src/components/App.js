import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Messenger from './Messenger';
import PostListing from './PostListing';
import UserListings from './UserListings';

export default function App() {
  const [messages, setMessages] = useState([
    { id: '1', username: 'Chris', text: 'I am good with that price', liked: false }
  ]);

  const [userListings, setUserListings] = useState([]);

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

  const addNewListing = (newListing) => {
    setUserListings([...userListings, newListing]);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/messenger"
        element={<Messenger messages={messages} addMessage={addMessage} likeMessage={likeMessage} />}
      />
      <Route path="/post-listing" element={<PostListing addNewListing={addNewListing} />} />
      <Route path="/user-listings" element={<UserListings listings={userListings} />} />
    </Routes>
  );
}