import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Messenger from './Messenger';
import PostListing from './PostListing';
import UserListings from './UserListings';
import NavBar from './NavBar';
import Footer from './Footer';

export default function App() {
  const [messages, setMessages] = useState([
    { id: '1', username: 'Chris', text: 'I am good with that price', liked: false }
  ]);

  const [listings, setListings] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

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
    setListings([...listings, newListing]);
  };

  return (
    <>
    <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <Routes>
      <Route path="/" element={<Home searchQuery={searchQuery} listings={listings} />} />
      <Route
        path="/messenger"
        element={<Messenger messages={messages} addMessage={addMessage} likeMessage={likeMessage} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
      />
      <Route path="/post-listing" element={<PostListing addNewListing={addNewListing} />} />
      <Route path="/user-listings" element={<UserListings searchQuery={searchQuery} listings={listings} />} />
    </Routes>
    <Footer />
    </>
  );
}