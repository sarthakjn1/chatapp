import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

const MessageList = () => {
  const { messages, userIdToUsernameMap } = useContext(ChatContext); // Access context
  const loggedInUserId = localStorage.getItem('user_id'); // Get logged-in user's ID

  return (
    <div className="mb-3">
      <h3>Messages</h3>
      <ul className="list-unstyled">
        {messages.map((message, index) => {
          // Get the sender's username from the map
          console.log(message);
          const senderUsername =
            message.sender_id == loggedInUserId
              ? 'Me' // Display "Me" if the sender is the logged-in user
              : userIdToUsernameMap[message.sender_id]; // Fallback to "Unknown" if the username is not found
          return (
            <li key={index} className="mb-2">
              <div className="card">
                <div className="card-body">
                  <strong>{senderUsername}:</strong> {message.content}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MessageList;