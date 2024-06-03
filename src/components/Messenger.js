import React, { useState, useEffect, useCallback } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { useLocation } from 'react-router-dom';

export default function Messenger({ searchQuery, setSearchQuery, currentUser }) {
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [userMessages, setUserMessages] = useState({});
  const location = useLocation();
  const db = getDatabase();

  // Fetch chats for the current user
  useEffect(() => {
    if (!currentUser || !currentUser.userId) return;
    const chatsRef = ref(db, `conversations`);
    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedChats = Object.keys(data)
          .filter(key => data[key].buyerId === currentUser.userId || data[key].sellerId === currentUser.userId)
          .map(key => ({
            id: key,
            ...data[key]
          }));
        setChats(formattedChats);
      } else {
        setChats([]);
      }
    });
  }, [currentUser, db]);

  // Function to create new chat
  const createNewChat = useCallback((itemTitle, sellerId, listingId, buyerId, currentUser) => {
    if (!itemTitle || !sellerId || !listingId || !buyerId || !currentUser) return;

    const chatRef = ref(db, `conversations`);
    const newChat = {
      buyerId: buyerId,
      sellerId: sellerId,
      listingId: listingId,
      messages: {
        initialMessage: {
          content: `You have initiated a chat regarding ${itemTitle}.`,
          senderId: buyerId,
          timestamp: Date.now()
        }
      }
    };
    const newChatKey = push(chatRef, newChat).key;

    setSelectedChat({ id: newChatKey, ...newChat });
  }, [db]);

  // Event listener for creating new chat
  useEffect(() => {
    const handleNewChatEvent = (event) => {
      const { itemTitle, sellerId, listingId, buyerId, currentUser } = event.detail;
      createNewChat(itemTitle, sellerId, listingId, buyerId, currentUser);
    };

    window.addEventListener('createNewChat', handleNewChatEvent);

    return () => {
      window.removeEventListener('createNewChat', handleNewChatEvent);
    };
  }, [createNewChat]);

  // Fetch messages for the selected chat
  useEffect(() => {
    if (!selectedChat) return;
    const messagesRef = ref(db, `conversations/${selectedChat.id}/messages`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      setUserMessages(data ? Object.values(data) : []);
    });
  }, [selectedChat, db]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      const messageRef = ref(db, `conversations/${selectedChat.id}/messages`);
      const newMessageObj = {
        content: newMessage,
        senderId: currentUser.userId,
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
        <h3>{`Chat with ${chat.sellerId === currentUser.userId ? 'buyer' : 'seller'}`}</h3>
        <p>{chat.messages[Object.keys(chat.messages)[0]].content}</p>
      </div>
      <div className="chat-item-time">{new Date(chat.messages[Object.keys(chat.messages)[0]].timestamp).toLocaleString()}</div>
    </div>
  ));

  const chatHistory = selectedChat
    ? userMessages.map((message, index) => (
        <div key={index} className={`message ${message.senderId === currentUser.userId ? 'sent' : 'received'}`}>
          <div className="message-header">
            <span className="message-username">{message.senderId}</span>
          </div>
          <p className="message-text">{message.content}</p>
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
