import React, { useState } from 'react';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending the message
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSend} className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit" className="btn btn-primary">Send</button>
    </form>
  );
};

export default MessageInput;