import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import SwitchUserModal from './SwitchUserModal';

import { useUser } from '../context/userContext';

/* const Header: React.FC = () => {
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
}; */

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const { user } = useUser();

  return (
    <header className="header">
      <h1 className='header-logo'>SkillBridge</h1>
      <nav className='header-nav'>
      <div className="user-status">
        {user ? (
          <span>Welcome, <strong>{user.name}</strong>!</span>
        ) : (
          <span className="login-message">Login to Search!</span>
        )}
      </div>
        <Link to="/">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/messages">Messages</Link>
        <button onClick={() => setShowModal(true)}>Switch User</button>
      </nav>
      {showModal && <SwitchUserModal onClose={() => setShowModal(false)} />}
    </header>
  );
};

export default Header;
