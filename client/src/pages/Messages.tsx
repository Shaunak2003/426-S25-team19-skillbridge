import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/global.css';
import '../styles/messages.css'

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
    <div className="chat-wrapper">
      <aside className="chat-sidebar">
        <h2 className="chat-title">Chats</h2>
        <input className="chat-search" placeholder="Search users..." />

        <div className="chat-list">
          {Object.keys(messages).map((user) => (
            <div
              key={user}
              className={`chat-user ${user === selectedUser ? 'active' : ''}`}
              onClick={() => setSelectedUser(user)}
            >
              <FaUserCircle className="avatar" />
              <div>
                <strong>{user}</strong>
                <p className="last-msg">{messages[user].slice(-1)[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="chat-main">
        <div className="chat-header">
          <FaUserCircle className="avatar large" />
          <div>
            <strong>{selectedUser}</strong>
            <p className="status">Active now</p>
          </div>
        </div>

        <div className="chat-body">
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
            placeholder="Type something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </section>
    </div>
  );
};

export default Messages;
