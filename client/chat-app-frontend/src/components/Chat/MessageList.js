import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { formatDate } from '../../utils/dateFormatter'; // Import the helper function

const MessageList = () => {
  const { messages, userIdToUsernameMap } = useContext(ChatContext); // Access context
  const loggedInUserId = localStorage.getItem('user_id'); // Get logged-in user's ID

  return (
    <div className="mb-3">
      <h3>Messages</h3>
      <ul className="list-unstyled">
        {messages.map((message, index) => {
          // Get the sender's username from the map
          const senderUsername =
            message.sender_id == loggedInUserId
              ? 'Me' // Display "Me" if the sender is the logged-in user
              : userIdToUsernameMap[message.sender_id] || 'Unknown'; // Fallback to "Unknown" if the username is not found

          // Format the createdAt date
          const formattedDate = formatDate(message.createdAt);

          return (
            <li key={index} className="mb-2">
              <div className="card">
                <div className="card-body">
                  <strong>{senderUsername}:</strong> {message.content}
                  {/* Display formatted date and status in the bottom right corner */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginTop: '8px',
                      fontSize: '0.875rem',
                      color: '#6c757d',
                    }}
                  >
                    <span style={{ marginRight: '8px' }}>{formattedDate}</span>
                    <span
                      style={{
                        color:
                          message.status === 'read'
                            ? '#28a745' // Green for "read"
                            : message.status === 'delivered'
                            ? '#17a2b8' // Blue for "delivered"
                            : '#6c757d', // Gray for "sent"
                      }}
                    >
                      {message.status}
                    </span>
                  </div>
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