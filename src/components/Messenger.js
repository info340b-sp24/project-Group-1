import React, { useState, useEffect } from 'react';
import chats from '../data/chats.json';

export default function Messenger({ searchQuery, setSearchQuery }) {
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [filteredChats, setFilteredChats] = useState(chats);
  const [userMessages, setUserMessages] = useState({});

  const addMessage = (message) => {
    if (selectedChat) {
      setUserMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChat.id]: [...(prevMessages[selectedChat.id] || []), message],
      }));
    }
  };

  const likeMessage = (index) => {
    if (selectedChat) {
      setUserMessages((prevMessages) => {
        const userMessages = prevMessages[selectedChat.id] || [];
        const newMessages = [...userMessages];
        newMessages[index].liked = !newMessages[index].liked;
        return {
          ...prevMessages,
          [selectedChat.id]: newMessages,
        };
      });
    }
  };

  useEffect(() => {
    const filtered = chats.filter((chat) => {
      if (searchQuery) {
        return chat.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });
    setFilteredChats(filtered);
  }, [searchQuery]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = { id: Math.random().toString(36).substr(2, 9), username: 'You', text: newMessage, liked: false };
      addMessage(newMsg);
      setNewMessage('');
    }
  };

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
  };

  const chatList = filteredChats.map((chat) => (
    <div
      key={chat.id}
      className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
      onClick={() => handleChatSelection(chat)}
    >
      <div className="chat-item-content">
        <h3>{chat.name}</h3>
        <p>{chat.lastMessage}</p>
      </div>
      <div className="chat-item-time">{chat.lastMessageTime}</div>
    </div>
  ));

  const chatHistory = selectedChat
    ? (userMessages[selectedChat.id] || []).map((message, index) => (
        <div key={message.id} className={`message ${message.username === 'You' ? 'sent' : 'received'}`}>
          <div className="message-header">
            <span className="message-username">{message.username}</span>
          </div>
          <p className="message-text">{message.text}</p>
          <div className="message-actions">
            <button className="like-button" onClick={() => likeMessage(index)}>
              <span style={{ color: message.liked ? 'red' : 'grey' }}>♥</span>
            </button>
          </div>
        </div>
      ))
    : null;

  return (
    <main>
      <div className='messages-container'>
        <div className="chat-container">
          <div className="chat-sidebar">
            <div className="customer-chat">
              <h2>Chats</h2>
              <input
                type="text"
                placeholder="Search by name"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="chat-list">
              {chatList}
            </div>
          </div>
          <div className="chat-content-box">
            {selectedChat ? (
              <div className="chat-content">
                <div className="chat-header">
                  <h2>All Messages</h2>
                </div>
                <div className="chat-history">
                  {chatHistory}
                </div>
                <form className="chat-input-container" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <div className="chat-buttons">
                    <button type="submit" className="button send-button">Send</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="no-chat-selected">
                <p>Please select a chat to view the messages.</p>
              </div>
            )}
          </div>
          <div className="chat-details">
            <div className="chat-details-header">
              <h3>{selectedChat?.name}</h3>
              <img src='./img/car.jpg' alt="User Avatar" className="user-avatar" />
              <p>Active 10 min ago</p>
            </div>
            <div className="chat-details-actions">
              <button className="button">View Profile</button>
              <button className="button">Block User</button>
            </div>
            <div className="chat-details-info">
              <p><strong>Location:</strong> New York, USA</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
