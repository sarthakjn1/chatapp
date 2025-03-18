import React from 'react';

const UserList = () => {
  const users = ['User1', 'User2', 'User3']; // Mock user list

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Users</h3>
        <ul className="list-group">
          {users.map((user, index) => (
            <li key={index} className="list-group-item">{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;