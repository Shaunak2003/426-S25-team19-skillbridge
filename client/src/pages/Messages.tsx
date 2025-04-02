import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import '../styles/global.css';
import '../styles/messages.css';

type User = {
  name: string;
  level: string;
  credits: number;
  rating: number;
  skills?: string[];
};

type MessageData = {
  [key: string]: string[];
};

const messagesMock: MessageData = {
  'ABC': ['Perfect!!'],
  'XYZ': ['I am interested in Math.'],
  'JKL': ['Nice'],
  'Emily Johnson': ['Hi'],
  'Michael Smith': ['Hi'],
  'Sophia Wilson': ['Start a new conversation']
};

const usersMock: { [key: string]: User } = {
  'ABC': { name: 'ABC', level: 'Advanced', credits: 30, rating: 4.8 },
  'XYZ': { name: 'XYZ', level: 'Beginner', credits: 15, rating: 4.2 },
  'JKL': { name: 'JKL', level: 'Intermediate', credits: 25, rating: 4.5 },
  'Emily Johnson': { name: 'Emily Johnson', level: 'Advanced', credits: 40, rating: 4.9 },
  'Michael Smith': { name: 'Michael Smith', level: 'Intermediate', credits: 20, rating: 4.3 },
  'Sophia Wilson': { name: 'Sophia Wilson', level: 'Intermediate', credits: 17, rating: 4.5 }
};

const Messages: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<MessageData>(() => {
    const stored = localStorage.getItem('chatMessages');
    return stored ? JSON.parse(stored) : messagesMock;
  });
  const [chatUser, setChatUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<string[]>(Object.keys(messagesMock));

  useEffect(() => {
    const storedUser = localStorage.getItem('selectedChatUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setSelectedUser(user.name);
      setChatUser(user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = Object.keys(messagesMock).filter(username => 
      username.toLowerCase().includes(query.toLowerCase()) ||
      usersMock[username].level.toLowerCase().includes(query.toLowerCase()) ||
      messages[username]?.[messages[username].length - 1]?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUserSelect = (username: string) => {
    setSelectedUser(username);
    setChatUser(usersMock[username]);
    localStorage.setItem('selectedChatUser', JSON.stringify(usersMock[username]));
  };

  const handleSend = () => {
    if (input.trim() && selectedUser) {
      setMessages(prev => ({
        ...prev,
        [selectedUser]: [...(prev[selectedUser] || []), input.trim()]
      }));
      setInput('');
    }
  };

  return (
    <div className="messages-container">
      <section className="chat-list">
        <h2>Chats</h2>
        <div className="search-bar">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="users-list">
          {filteredUsers.map((username) => (
            <div
              key={username}
              className={`user-chat ${selectedUser === username ? 'active' : ''}`}
              onClick={() => handleUserSelect(username)}
            >
              <FaUserCircle className="avatar" />
              <div className="chat-preview">
                <div className="chat-name">{username}</div>
                <div className="chat-last-message">
                  {messages[username]?.[messages[username].length - 1] || 'No messages yet'}
                </div>
                <div className="user-status">
                  {usersMock[username].level} • {usersMock[username].rating}/5 • {usersMock[username].credits} credits
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="chat-main">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <FaUserCircle className="avatar large" />
              <div>
                <strong>{selectedUser}</strong>
                <p className="status">
                  {chatUser ? `${chatUser.level} • ${chatUser.rating}/5 • ${chatUser.credits} credits` : 'Active now'}
                </p>
              </div>
            </div>

            <div className="chat-body">
              {messages[selectedUser]?.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${index % 2 === 0 ? 'received' : 'sent'}`}
                >
                  {msg}
                </div>
              ))}
              {(!messages[selectedUser] || messages[selectedUser].length === 0) && (
                <div className="chat-empty">
                  Start a conversation with {selectedUser}
                </div>
              )}
            </div>

            <div className="chat-input">
              <input
                placeholder="Type something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <h3>Select a chat to start messaging</h3>
          </div>
        )}
      </section>
    </div>
  );
};

export default Messages;
