import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

// Make it save chat history
export function Messenger() {
  let [messages, setMessages] = useState([
    { id: '1', username: 'Chris', text: 'I am good with that price', liked: false }
  ]);
  let [newMessage, setNewMessage] = useState('');

  let handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      let newMsg = { id: Math.random().toString(36).substr(2, 9), username: 'You', text: newMessage, liked: false };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  let handleLike = (index) => {
    let updatedMessages = [...messages];
    updatedMessages[index].liked = !updatedMessages[index].liked;
    setMessages(updatedMessages);
  };

  return (
    <div>
      <Header />
      <main>
        <div className="chat-container">
          <h2 className="text-center">Messenger</h2>
          <div className="chat-history">
            {messages.map((message, index) => (
              <div key={message.id} className="message">
                <div className="message-header">
                  <span className="message-username">{message.username === 'You' ? 'You' : 'Chris'}</span>
                </div>
                <p className="message-text">{message.text}</p>
                <div className="message-actions">
                  <button className="like-button" onClick={() => handleLike(index)}>
                    <span style={{ color: message.liked ? 'red' : 'grey' }}>♥</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <form className="chat-input-container" onSubmit={handleSendMessage}>
            {/* Single input field for sending messages */}
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
      </main>
      <Footer />
    </div>
  );
}
