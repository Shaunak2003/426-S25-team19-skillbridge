import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/messages">Messages</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/skills">My Skills</a></li>
        <li><a href="/jobs">Find Jobs</a></li>
        <li><a href="/teach">Teach a Skill</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
