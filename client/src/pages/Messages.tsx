import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/global.css';

const messagesMock = {
  ABC: ['Hey', 'I want to learn Spanish. I can teach coding', 'Perfect!!'],
  XYZ: ['Hello!', 'I am interested in Math.'],
  JKL: ['Can we collaborate?', 'Yes, let’s do it!']
};

const Messages: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('ABC');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(messagesMock);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => ({
        ...prev,
        [selectedUser]: [...prev[selectedUser], input.trim()]
      }));
      setInput('');
    }
  };

  return (
    <div className="messages-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Chats</h2>
        {Object.keys(messages).map((user) => (
          <div
            key={user}
            className={`sidebar-user ${user === selectedUser ? 'active' : ''}`}
            onClick={() => setSelectedUser(user)}
          >
            <FaUserCircle className="avatar" />
            <span>{user}</span>
          </div>
        ))}
      </div>

      <div className="chat-window">
        <div className="chat-header">
          <FaUserCircle className="avatar" />
          <strong>{selectedUser}</strong>
        </div>

        <div className="chat-messages">
          {messages[selectedUser].map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${index % 2 === 0 ? 'received' : 'sent'}`}
            >
              {msg}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
