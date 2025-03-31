import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-logo">SkillBridge</div>
      <nav className="header-nav">
        <a href="/">Dashboard</a>
        <a href="/profile">Profile</a>
        <a href="/messages">Messages</a>
      </nav>
    </header>
  );
};

export default Header;
