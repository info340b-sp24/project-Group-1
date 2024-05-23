import React, { useState } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: "I'm good with that price", from: 'Chris' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, from: 'You' }]);
      setNewMessage('');
    }
  };

  const renderMessages = () => {
    return messages.map((msg, index) => (
      <p key={index}><strong>{msg.from}:</strong> {msg.text}</p>
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
