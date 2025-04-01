import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/global.css';
import '../styles/messages.css';

type User = {
  name: string;
  level: string;
  credits: number;
  rating: number;
  skills?: string[];
};

interface MessageData {
  [key: string]: string[];
}

// Initial mock data
const initialMessages: MessageData = {
  ABC: ['Hey', 'I want to learn Spanish. I can teach coding', 'Perfect!!'],
  XYZ: ['Hello!', 'I am interested in Math.'],
  JKL: ['Can we collaborate?', 'Yes, lets do it!']
};

const Messages: React.FC = () => {
  // Initialize state with localStorage data or defaults
  const [selectedUser, setSelectedUser] = useState<string>(() => {
    const storedUser = localStorage.getItem('selectedChatUser');
    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      return user.name;
    }
    return 'ABC';
  });

  const [input, setInput] = useState('');
  
  const [messages, setMessages] = useState<MessageData>(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : initialMessages;
  });
  
  const [chatUser, setChatUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('selectedChatUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Initialize chat for new user
  useEffect(() => {
    const storedUser = localStorage.getItem('selectedChatUser');
    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      setChatUser(user);
      
      // Initialize chat if it doesn't exist
      if (!messages[user.name]) {
        setMessages(prev => ({
          ...prev,
          [user.name]: []
        }));
      }
      setSelectedUser(user.name);
    }
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const updatedMessages = {
        ...messages,
        [selectedUser]: [...(messages[selectedUser] || []), input.trim()]
      };
      setMessages(updatedMessages);
      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
      setInput('');
    }
  };

  const handleUserSelect = (user: string) => {
    setSelectedUser(user);
    // If this is a new chat, initialize it
    if (!messages[user]) {
      const updatedMessages = {
        ...messages,
        [user]: []
      };
      setMessages(updatedMessages);
      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
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
              onClick={() => handleUserSelect(user)}
            >
              <FaUserCircle className="avatar" />
              <div>
                <strong>{user}</strong>
                <p className="last-msg">
                  {messages[user].length > 0 
                    ? messages[user][messages[user].length - 1] 
                    : 'Start a new conversation'}
                </p>
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
      </section>
    </div>
  );
};

export default Messages;
