import React, { useState } from 'react';
import { useUser } from '../context/userContext';

const SwitchUserModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { switchUser } = useUser();

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
      } else {
        switchUser(data.user);
        onClose(); 
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Switch User</h2>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Switch</button>
        {error && <p className="error">{error}</p>}
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SwitchUserModal;
