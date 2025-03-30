import React, { useState } from 'react';
import mockUsers from '../data/mockUsers.json';
import "../styles/global.css";

type User = {
  name: string;
  level: string;
  credits: number;
  rating: number;
};

const allUsers: User[] = mockUsers;

const Dashboard: React.FC = () => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(allUsers);
  const [filterVisible, setFilterVisible] = useState(false);

  const handleFilterByLevel = (level: string) => {
    setFilteredUsers(allUsers.filter(user => user.level === level));
    setFilterVisible(false);
  };

  const handleFilterByRating = (min: number, max: number) => {
    setFilteredUsers(allUsers.filter(user => user.rating >= min && user.rating < max));
    setFilterVisible(false);
  };

  const resetFilter = () => {
    setFilteredUsers(allUsers);
    setFilterVisible(false);
  };

  return (
    <div className="dashboard">
      <div className="top-cards">
        <div className="card">Current Courses</div>
        <div className="card">Saved Courses</div>
        <div className="card">Credits: <strong>20</strong></div>
        <div className="card circle">50%</div>
        <div className="card icon">👤</div>
      </div>

      <div className="search-bar" style={{ position: "relative" }}>
        <input type="text" placeholder="Search..." />
        <button
          className="filter-btn"
          onClick={() => setFilterVisible(!filterVisible)}
        >
          Filter ⬇️
        </button>

        {filterVisible && (
          <div className='filter-dropdown'>
            <p>Filter by Level:</p>
            <button onClick={() => handleFilterByLevel('Novice')}>Novice</button>
            <button onClick={() => handleFilterByLevel('Intermediate')}>Intermediate</button>
            <button onClick={() => handleFilterByLevel('Advanced')}>Advanced</button>

            <p>Filter by Rating:</p>
            <button onClick={() => handleFilterByRating(0, 1)}>0 - 1</button>
            <button onClick={() => handleFilterByRating(1, 2)}>1 - 2</button>
            <button onClick={() => handleFilterByRating(2, 3)}>2 - 3</button>
            <button onClick={() => handleFilterByRating(3, 4)}>3 - 4</button>
            <button onClick={() => handleFilterByRating(4, 5.1)}>4 - 5</button>

            <button className="reset-btn" onClick={resetFilter}>Reset Filter</button>
          </div>
        )}
      </div>

      <div className="user-list">
        {filteredUsers.map((user, index) => (
          <div
            className="user-row"
            key={index}
            style={{ '--i': index } as React.CSSProperties}
          >
            <div className="user-info">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                alt={user.name}
                className="avatar"
              />
              <span className="username">{user.name}</span>
            </div>
            <span>{user.level}</span>
            <span>{user.credits} credits</span>
            <span>{user.rating}/5 ⭐</span>
            <button className="msg-btn">MSG</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;