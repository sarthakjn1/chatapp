import React from 'react';

const MessageList = () => {
  const messages = [
    { id: 1, text: 'Hello!', sender: 'User1' },
    { id: 2, text: 'Hi there!', sender: 'User2' },
  ]; // Mock messages

  return (
    <div className="mb-3">
      <h3>Messages</h3>
      <ul className="list-unstyled">
        {messages.map((message) => (
          <li key={message.id} className="mb-2">
            <div className="card">
              <div className="card-body">
                <strong>{message.sender}:</strong> {message.text}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;