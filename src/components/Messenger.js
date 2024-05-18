import React, { useState } from 'react';

export default function Messenger({ messages, addMessage, likeMessage }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = { id: Math.random().toString(36).substr(2, 9), username: 'You', text: newMessage, liked: false };
      addMessage(newMsg);
      setNewMessage('');
    }
  };

  return (
    <main>
      <div className='.messages-container'>
      <div className="chat-container">
        <div className="chat-sidebar">
          <div className="customer-chat">
            <h2>Chats</h2>
            <input type="text" placeholder="Search by name" className="search-input" />
          </div>
          <div className="chat-list">
            <div className="chat-item active">
              <div className="chat-item-content">
                <h3>John Smith</h3>
                <p>Hey there! How are you?</p>
              </div>
              <div className="chat-item-time">10:30 AM</div>
            </div>
            <div className="chat-item">
              <div className="chat-item-content">
                <h3>Jane Doe</h3>
                <p>Can we schedule a meeting for tomorrow?</p>
              </div>
              <div className="chat-item-time">09:15 AM</div>
            </div>
          </div>
        </div>
      <div className="chat-content-box">
        <div className="chat-content">
          <div className="chat-header">
            <h2>All Messages</h2>
          </div>
          <div className="chat-history">
            {messages.map((message, index) => (
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
            ))}
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
      </div>
          
        <div className="chat-details">
          <div className="chat-details-header">
            <h3>John Smith</h3>
            <img src='./img/car.jpg' alt="User Avatar" className="user-avatar" />
            <p>Active 10 min ago</p>
          </div>
          <div className="chat-details-actions">
            <button className="button">View Profile</button>
            <button className="button">Block User</button>
          </div>
          <div className="chat-details-info">
            <p><strong>Email:</strong> john.smith@example.com</p>
            <p><strong>Phone:</strong> +1 123-456-7890</p>
            <p><strong>Location:</strong> New York, USA</p>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}