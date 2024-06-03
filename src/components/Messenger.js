import React, { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { db } from '../index';

export default function Messenger({ searchQuery, setSearchQuery, currentUser }) {
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [userMessages, setUserMessages] = useState({});

  // Fetch chats for the current user
  useEffect(() => {
    if (!currentUser || !currentUser.userId) return;
    const chatsRef = ref(db, `chats/${currentUser.userId}`);
    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedChats = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setChats(formattedChats);
      } else {
        setChats([]);
      }
    });
  }, [currentUser]);

  // Fetch messages for the selected chat
  useEffect(() => {
    if (!selectedChat) return;
    const messagesRef = ref(db, `messages/${selectedChat.id}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      setUserMessages(data ? Object.values(data) : []);
    });
  }, [selectedChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      const messageRef = ref(db, `messages/${selectedChat.id}`);
      const newMessageObj = {
        text: newMessage,
        from: currentUser.userName,
        timestamp: Date.now()
      };
      push(messageRef, newMessageObj);
      setNewMessage('');
    }
  };

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
  };

  const chatList = chats.map((chat) => (
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
    ? userMessages.map((message, index) => (
        <div key={index} className={`message ${message.from === currentUser.userName ? 'sent' : 'received'}`}>
          <div className="message-header">
            <span className="message-username">{message.from}</span>
          </div>
          <p className="message-text">{message.text}</p>
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
                  <button type="submit" className="send-button">Send</button>
                </form>
              </div>
            ) : (
              <div className="no-chat-selected">
                <p>Please select a chat to view the messages.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
