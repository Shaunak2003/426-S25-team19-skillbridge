import React, { useState } from 'react';
import '../styles/global.css';

const predefinedInterests = [
  'Coding', 'History', 'Math', 'Science', 'Finance', 'Economics', 'Spanish'
];

const Profile: React.FC = () => {
  const [interests, setInterests] = useState<string[]>(['Coding', 'Economics', 'Spanish']);
  const [customKeyword, setCustomKeyword] = useState('');

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
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
          <input
            type="text"
            placeholder="Type interests..."
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
