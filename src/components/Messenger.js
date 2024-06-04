// Messenger.js
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import ChatBox from './ChatBox';

export default function Messenger({ searchQuery, setSearchQuery, currentUser }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatIds, setChatIds] = useState([]);
  const [chats, setChats] = useState([]);
  const [correspondent, setCorrespondent] = useState('');
  const db = getDatabase();

  useEffect(() => {
    if (!currentUser || !currentUser.userId) return;
    const userChatsRef = ref(db, `users/${currentUser.userId}/conversationIds`);
    onValue(userChatsRef, (snapshot) => {
      let chatIds = [];
      const data = snapshot.val();
      if (data) {
        chatIds = Object.keys(data);
      }
      setChatIds(chatIds);
    });
  }, [currentUser, db]);

  useEffect(() => {
    if (!chatIds.length) return;

    const chatRefs = chatIds.map(chatId => ref(db, `conversations/${chatId}`));

    const unsubscribes = chatRefs.map(chatRef =>
      onValue(chatRef, (snapshot) => {
        const chatData = snapshot.val();
        const messages = chatData.messages || {};
        const lastMessageKey = Object.keys(messages).pop();
        const lastMessage = messages[lastMessageKey];

        setChats(prevChats => {
          const updatedChats = [...prevChats];
          const chatIndex = updatedChats.findIndex(chat => chat.id === snapshot.key);
          if (chatIndex !== -1) {
            updatedChats[chatIndex] = {
              id: snapshot.key,
              lastMessage: lastMessage?.content || '',
              timestamp: lastMessage?.timestamp || Date.now(),
              sellerId: chatData.sellerId,
              buyerId: chatData.buyerId
            };
          } else {
            updatedChats.push({
              id: snapshot.key,
              lastMessage: lastMessage?.content || '',
              timestamp: lastMessage?.timestamp || Date.now(),
              sellerId: chatData.sellerId,
              buyerId: chatData.buyerId
            });
          }
          return updatedChats.sort((a, b) => {

          });
        });
      })
    );

    return () => {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }, [chatIds, db]);



  // const handleNewChatEvent = (event) => {
  //   const { conversationId } = event.detail;
  //   const conversationRef = ref(db, `conversations/${conversationId}/messages`);
  //   onValue(conversationRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const messages = data ? Object.values(data) : [];
  //     setUserMessages(messages);
  //     setSelectedChat({ id: conversationId, messages });
  //   });
  // };

  // window.addEventListener('createNewChat', handleNewChatEvent);

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
        <h3>{`Chat with ${correspondent}`}</h3>
        <p>{chat.lastMessage}</p>
      </div>
      <div className="chat-item-time">{new Date(chat.timestamp).toLocaleString()}</div>
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
                <div className="chat-history"><ChatBox selectedChat={selectedChat} sendMessage={handleSendMessage} correspondent={correspondent} setCorrespondent={setCorrespondent} /></div>
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
