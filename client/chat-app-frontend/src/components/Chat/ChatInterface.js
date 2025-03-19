import React, { useContext } from 'react';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useNavigate } from 'react-router-dom';

const ChatInterface = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear authentication state
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-3">
          <UserList />
          {/* Logout Button */}
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
                Logout
          </button>
        </div>
        
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <MessageList />
              <MessageInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;