import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">SkillBridge</div>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/profile">Profile</a>
      </nav>
    </header>
  );
};

export default Header;
