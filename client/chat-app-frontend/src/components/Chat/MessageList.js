import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

const MessageList = () => {
  const { messages } = useContext(ChatContext); // Access messages from the context

  return (
    <div className="mb-3">
      <h3>Messages</h3>
      <ul className="list-unstyled">
        {messages.map((message, index) => (
          <li key={index} className="mb-2">
            <div className="card">
              <div className="card-body">
                <strong>{message.sender}:</strong> {message.content}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;