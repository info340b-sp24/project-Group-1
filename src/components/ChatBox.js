import React, { useState } from 'react';

const ChatBox = ({ messages, sendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage); // Log message before sending
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  const renderMessages = () => {
    return messages.map((msg, index) => (
      <p key={index}><strong>{msg.senderId}:</strong> {msg.content}</p>
    ));
  };

  return (
    <section className="messages">
      <div className="message-container">
        {renderMessages()}
      </div>
      <form className="message-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="message-input"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </section>
  );
};

export default ChatBox;
