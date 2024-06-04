// ChatBox.js
import React, { useState, useEffect } from 'react';
import { ref, onValue, getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const ChatBox = ({ selectedChat, sendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [correspondent, setCorrespondent] = useState('');

  const currentUser = getAuth().currentUser;

  console.log(messages);

  const db = getDatabase();

  useEffect(() => {
    const selectedChatMessagesRef = ref(db, `conversations/${selectedChat.id}/messages`);
    const unsubscribe = onValue(selectedChatMessagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const messages = data ? Object.values(data) : [];
      setMessages(messages);
    });
    return unsubscribe;
  }, [selectedChat]);

  useEffect(() => {
    const userIsSeller = selectedChat.sellerId === currentUser.uid;
    console.log(selectedChat)
    const correspondentRef = ref(db, `users/${userIsSeller ? selectedChat.buyerId : selectedChat.sellerId}/username`);
    const unsubscribe = onValue(correspondentRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const correspondent = data ? data : '';
      setCorrespondent(correspondent);
    });
    return unsubscribe;
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  const messageElements = messages.map((msg, index) => (
    <p key={index}><strong>{msg.senderId === currentUser.uid ? "You" : correspondent}:</strong> {msg.content}</p>
  ));

  return (
    <section className="messages">
      <div className="message-container">{messageElements}</div>
      <form className="message-form" onSubmit={handleSendMessage}>
        <input type="text" className="message-input" placeholder="Type your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button type="submit" className="send-button">Send</button>
      </form>
    </section>
  );
};

export default ChatBox;
