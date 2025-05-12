// src/pages/Messages.tsx
import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import '../styles/global.css';
import '../styles/messages.css';
import { useUser } from '../context/UserContext';

type User = {
  id: number;
  name: string;
  level: string;
  credits: number;
  rating: number;
};

type Message = {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  sent_at: string;
};

const Messages: React.FC = () => {
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:3000/api/users');
      const data = await res.json();
      const otherUsers = data.filter((u: User) => u.id !== user?.id);
      setUsers(otherUsers);
      setFilteredUsers(otherUsers);
    };

    if (user) fetchUsers();
  }, [user]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !selectedUser) return;
      try {
        const res = await fetch(`http://localhost:3000/api/messages/${user.id}/${selectedUser.id}`);
        const data = await res.json();
        setConversation(data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    fetchMessages();
  }, [user, selectedUser]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = users.filter((u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.level.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSend = async () => {
    const selectedUserId = selectedUser?.id
    if (input.trim() && selectedUserId && user) {
      const newMessage = {
        sender_id: user.id,
        receiver_id: selectedUserId,
        content: input.trim()
      };
  
      try {
        const res = await fetch('http://localhost:3000/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMessage)
        });
  
        const data = await res.json();
  
        setConversation((prev) => [...prev, data]);
        setInput('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  return (
    <div className="messages-container">
      {/* Sidebar */}
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
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className={`user-chat ${selectedUser?.id === u.id ? 'active' : ''}`}
              onClick={() => setSelectedUser(u)}
            >
              <FaUserCircle className="avatar" />
              <div className="chat-preview">
                <div className="chat-name">{u.name}</div>
                <div className="user-status">
                  {u.level} • {u.rating}/5 • {u.credits} credits
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Chat Window */}
      <section className="chat-main">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <FaUserCircle className="avatar large" />
              <div>
                <strong>{selectedUser.name}</strong>
                <p className="status">
                  {selectedUser.level} • {selectedUser.rating}/5 • {selectedUser.credits} credits
                </p>
              </div>
            </div>

            <div className="chat-body">
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-bubble ${msg.sender_id === user?.id ? 'sent' : 'received'}`}
                >
                  {msg.content}
                </div>
              ))}
              {conversation.length === 0 && (
                <div className="chat-empty">
                  Start a conversation with {selectedUser.name}
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
