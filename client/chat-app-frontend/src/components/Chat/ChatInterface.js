import React from 'react';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatInterface = () => {
  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-3">
          <UserList />
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