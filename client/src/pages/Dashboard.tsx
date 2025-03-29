// import React from 'react';
// import mockUsers from '../data/mockUsers.json'; 

// type User = {
//   name: string;
//   level: string;
//   credits: number;
//   rating: number;
// };


// const users: User[] = mockUsers;

// const Dashboard: React.FC = () => {
//   return (
//     <div className="dashboard">
//       <div className="top-cards">
//         <div className="card">Current Courses</div>
//         <div className="card">Saved Courses</div>
//         <div className="card">Credits: <strong>20</strong></div>
//         <div className="card circle">50%</div>
//         <div className="card icon">👤</div>
//       </div>

//       <div className="search-bar">
//         <input type="text" placeholder="Search users..." />
//         <button className="filter-btn">Filter ⬇️</button>
//       </div>

//       <div className="user-list">
//         {users.map((user, index) => (
//           <div className="user-row" key={index}>
//             <span className="username">{user.name}</span>
//             <span>{user.level}</span>
//             <span>{user.credits} credits</span>
//             <span>{user.rating}/5 ⭐</span>
//             <button className="msg-btn">MSG</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import mockUsers from '../data/mockUsers.json';

type User = {
  name: string;
  level: string;
  credits: number;
  rating: number;
};

const users: User[] = mockUsers;

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="top-cards">
        <div className="card">Current Courses</div>
        <div className="card">Saved Courses</div>
        <div className="card">Credits: <strong>20</strong></div>
        <div className="card circle">50%</div>
        <div className="card icon">👤</div>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search users..." />
        <button className="filter-btn">Filter ⬇️</button>
      </div>

      <div className="user-list">
        {users.map((user, index) => (
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
