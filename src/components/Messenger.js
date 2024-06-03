// Messenger.js
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import ChatBox from './ChatBox';

export default function Messenger({ searchQuery, setSearchQuery, currentUser }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    if (!currentUser || !currentUser.userId) return;
    const chatsRef = ref(db, 'conversations');
    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      const formattedChats = Object.keys(data).filter(key => data[key].buyerId === currentUser.userId || data[key].sellerId === currentUser.userId).map(key => ({
        id: key,
        ...data[key]
      }));
      setChats(formattedChats);
    });
  }, [currentUser, db]);

  const handleNewChatEvent = (event) => {
    const { conversationId } = event.detail;
    const conversationRef = ref(db, `conversations/${conversationId}/messages`);
    onValue(conversationRef, (snapshot) => {
      const data = snapshot.val();
      const messages = data ? Object.values(data) : [];
      setUserMessages(messages);
      setSelectedChat({ id: conversationId, messages });
    });
  };

  window.addEventListener('createNewChat', handleNewChatEvent);

  const handleSendMessage = (message) => {
    if (message.trim() && selectedChat) {
      const messageRef = ref(db, `conversations/${selectedChat.id}/messages`);
      const newMessageObj = { content: message, senderId: currentUser.userId, timestamp: Date.now() };
      push(messageRef, newMessageObj);
    }
  };

  const handleChatSelection = (chat) => setSelectedChat(chat);

  const chatList = chats.map((chat) => (
    <div key={chat.id} className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`} onClick={() => handleChatSelection(chat)}>
      <div className="chat-item-content">
        <h3>{`Chat with ${chat.sellerId === currentUser.userId ? 'buyer' : 'seller'}`}</h3>
        <p>{chat.messages && chat.messages[Object.keys(chat.messages)[0]].content}</p>
      </div>
      <div className="chat-item-time">{new Date(chat.messages && chat.messages[Object.keys(chat.messages)[0]].timestamp).toLocaleString()}</div>
    </div>
  ));

  return (
    <main>
      <div className='messages-container'>
        <div className="chat-container">
          <div className="chat-sidebar">
            <div className="customer-chat">
              <h2>Chats</h2>
              <input type="text" placeholder="Search by name" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="chat-list">{chatList}</div>
          </div>
          <div className="chat-content-box">
            {selectedChat ? (
              <div className="chat-content">
                <div className="chat-header"><h2>All Messages</h2></div>
                <div className="chat-history"><ChatBox messages={userMessages} sendMessage={handleSendMessage} /></div>
              </div>
            ) : (
              <div className="no-chat-selected"><p>Please select a chat to view the messages.</p></div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
