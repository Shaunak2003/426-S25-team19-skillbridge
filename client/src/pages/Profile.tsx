import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import '../styles/global.css';

const predefinedInterests = [
  'Coding', 'History', 'Math', 'Science', 'Finance', 'Economics', 'Spanish'
];

type Keyword = {
  id: number;
  text: string;
  isInterest?: boolean;
};

const Profile: React.FC = () => {
  const [interests, setInterests] = useState<string[]>(() => {
    const stored = localStorage.getItem('interests');
    return stored ? JSON.parse(stored) : ['Coding', 'Economics', 'Spanish'];
  });

  const [keywords, setKeywords] = useState<Keyword[]>(() => {
    const stored = localStorage.getItem('keywords');
    return stored ? JSON.parse(stored) : [];
  });
  
  const [keywordInput, setKeywordInput] = useState('');

  useEffect(() => {
    localStorage.setItem('interests', JSON.stringify(interests));
  }, [interests]);

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      const text = keywordInput.trim();
      const isInterest = predefinedInterests.includes(text);
      const newKeyword: Keyword = {
        id: Date.now(),
        text,
        isInterest
      };
      setKeywords(prev => [...prev, newKeyword]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (id: number) => {
    setKeywords(prev => prev.filter(keyword => keyword.id !== id));
  };

  const handleAddToInterests = (text: string) => {
    if (!interests.includes(text)) {
      setInterests(prev => [...prev, text]);
    }
  };

  return (
    <div className="main-content" style={{ paddingBottom: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Your Profile</h1>

      {/* Profile Info + Credits */}
      <div className="profile-details" style={{ marginBottom: '1.5rem' }}>
        <div className="profile-fields" style={{ width: '100%' }}>
          <div className="profile-field">
            <label>Username:</label>
            <div className="field-value">john_doe</div>
            <button className="change-button">Change</button>
          </div>
          <div className="profile-field">
            <label>Password:</label>
            <div className="field-value">********</div>
            <button className="change-button">Change</button>
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <div className="field-value">abc@xyz.com</div>
          </div>
          <div className="profile-field">
            <label>Phone:</label>
            <div className="field-value">123-456</div>
          </div>
        </div>

        {/* Credits Box */}
        <div className="credits-section" style={{ marginTop: '0.5rem' }}>
          <div className="credits-value">20</div>
          <span>Credits</span>
          <div className="completion-circle">50%</div>
          <button className="buy-credits">Buy Credits</button>
          <div className="premium-button">⭐⭐⭐⭐☆</div>
        </div>
      </div>

      {/* Interests + Keywords Side by Side */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Interests */}
        <div className="interests-section" style={{ flex: 1 }}>
          <label className="interests-header">Select Interests:</label>
          <div className="interests-options">
            {predefinedInterests.map((interest, i) => (
              <div className="interest-option" key={i}>
                <input
                  type="checkbox"
                  id={interest}
                  checked={interests.includes(interest)}
                  onChange={() => toggleInterest(interest)}
                />
                <label htmlFor={interest}>{interest}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div className="keywords-section" style={{ flex: 1 }}>
          <label>Add Keywords:</label>
          <div className="keywords-input-container">
            <input
              type="text"
              placeholder="Type keywords and press Enter..."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={handleAddKeyword}
              className="keyword-input"
            />
          </div>
          <div className="keywords-list">
            {keywords.map((keyword) => (
              <div key={keyword.id} className="keyword-tag" style={{ 
                background: keyword.isInterest ? 'var(--gradient-1)' : 'var(--gradient-purple)'
              }}>
                <span>{keyword.text}</span>
                <div className="keyword-actions">
                  {keyword.isInterest && !interests.includes(keyword.text) && (
                    <button
                      onClick={() => handleAddToInterests(keyword.text)}
                      className="add-to-interests"
                      title="Add to interests"
                    >
                      <FaPlus />
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveKeyword(keyword.id)}
                    className="remove-keyword"
                    title="Remove keyword"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
