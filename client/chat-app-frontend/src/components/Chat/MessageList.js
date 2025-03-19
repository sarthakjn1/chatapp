import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { formatDate } from '../../utils/dateFormatter'; // Import the helper function
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './MessageList.css'; // Import the CSS file

const MessageList = () => {
  const { messages, userIdToUsernameMap } = useContext(ChatContext); // Access context
  const loggedInUserId = localStorage.getItem('user_id'); // Get logged-in user's ID
  console.log(messages);

  return (
    <div className="message-list-container">
      <h2 className="message-list-title">Messages</h2>
      <List className="message-list">
        
        {messages.map((message, index) => {
          // Get the sender's username from the map
          const senderUsername =
            message.sender_id == loggedInUserId
              ? 'Me' // Display "Me" if the sender is the logged-in user
              : userIdToUsernameMap[message.sender_id] || 'Unknown'; // Fallback to "Unknown" if the username is not found

          // Format the createdAt date
          const formattedDate = formatDate(message.createdAt);

          return (
            <ListItem key={index} className="message-item">
              <Card className="message-card">
                <CardContent>
                  <Typography variant="subtitle1" className="message-sender">
                    <strong>{senderUsername}</strong>
                  </Typography>
                  <Typography variant="body2" className="message-content">
                    {message.content}
                  </Typography>
                  <div className="message-footer">
                    <Typography variant="caption">{formattedDate}</Typography>
                  </div>
                  <div className="message-footer">
                  <Typography
                      variant="caption"
                      className={`message-status ${message.status}`}
                    >
                      {message.status}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default MessageList;