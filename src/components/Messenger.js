import React, { useState, useEffect, useCallback } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import ChatBox from './ChatBox';

export default function Messenger({ searchQuery, setSearchQuery, currentUser }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    if (!currentUser || !currentUser.userId) return;
    const chatsRef = ref(db, `conversations`);
    onValue(chatsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const formattedChats = Object.keys(data)
            .filter(key => data[key].buyerId === currentUser.userId || data[key].sellerId === currentUser.userId)
            .map(key => ({
              id: key,
              ...data[key]
            }));
          console.log('Fetched chats:', formattedChats); // Log fetched chats
          setChats(formattedChats);
        } else {
          setChats([]);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    });
  }, [currentUser, db]);

  const createNewChat = useCallback((itemTitle, sellerId, listingId, buyerId, currentUser) => {
    if (!itemTitle || !sellerId || !listingId || !buyerId || !currentUser) return;

    console.log('Creating new chat with details:', {
      itemTitle, sellerId, listingId, buyerId, currentUser
    });

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

    console.log('New chat created with key:', newChatKey); // Log new chat key
    setChats((prevChats) => [...prevChats, { id: newChatKey, ...newChat }]);
    setSelectedChat({ id: newChatKey, ...newChat });
  }, [db]);

  useEffect(() => {
    const handleNewChatEvent = (event) => {
      console.log('Received createNewChat event with details:', event.detail);
      const { itemTitle, sellerId, listingId, buyerId, currentUser } = event.detail;
      createNewChat(itemTitle, sellerId, listingId, buyerId, currentUser);
    };

    console.log('Registering event listener for createNewChat');
    window.addEventListener('createNewChat', handleNewChatEvent);

    return () => {
      console.log('Removing event listener for createNewChat');
      window.removeEventListener('createNewChat', handleNewChatEvent);
    };
  }, [createNewChat]);

  useEffect(() => {
    if (!selectedChat) return;
    console.log('Selected chat:', selectedChat); // Log selected chat
    const messagesRef = ref(db, `conversations/${selectedChat.id}/messages`);
    onValue(messagesRef, (snapshot) => {
      try {
        const data = snapshot.val();
        console.log('Fetched messages for selected chat:', data); // Log fetched messages
        setUserMessages(data ? Object.values(data) : []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    });
  }, [selectedChat, db]);

  const handleSendMessage = (message) => {
    if (message.trim() && selectedChat) {
      const messageRef = ref(db, `conversations/${selectedChat.id}/messages`);
      const newMessageObj = {
        content: message,
        senderId: currentUser.userId,
        timestamp: Date.now()
      };
      console.log('Sending message:', newMessageObj); // Log message being sent
      push(messageRef, newMessageObj);
    }
  };

  const handleChatSelection = (chat) => {
    console.log('Chat selected:', chat);
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
                  <ChatBox messages={userMessages} sendMessage={handleSendMessage} />
                </div>
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
