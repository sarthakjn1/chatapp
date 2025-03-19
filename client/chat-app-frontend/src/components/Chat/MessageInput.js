import React, { useState, useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import './MessageInput.css'; // Import the CSS file
import axios from 'axios';

const MessageInput = () => {
  const [message, setMessage] = useState(''); // State to store the message content
  const [file, setFile] = useState(null); // State to store the selected file
  const { selectedUser } = useContext(ChatContext); // Access selectedUser from context
  const loggedInUserId = localStorage.getItem('user_id'); // Get logged-in user's ID

  const handleSendMessage = async () => {
    if (!message.trim() && !file) {
      alert('Please enter a message or select a file to send.');
      return;
    }

    try {
      // Step 1: Send the message
      const messageResponse = await axios.post('http://localhost:3000/message/send', {
        content: message,
        sender_id: +loggedInUserId, // Ensure sender_id is a number
        receiver_id: selectedUser.id,
      });

      if (messageResponse.status === 201) {
        console.log('Message Response:', messageResponse);
        const sequenceNumber = messageResponse.data.sequence_number; // Extract sequence_number from the response

        // Step 2: If a file is selected, upload it with the sequence_number
        if (file) {
          const formData = new FormData();
          formData.append('file', file); // Append the file to the form data
          formData.append('sequence_number', sequenceNumber); // Append the sequence_number
          formData.append('sender_id', loggedInUserId); // Append sender_id
          formData.append('receiver_id', selectedUser.id); // Append receiver_id

          // Call the file upload API
          const fileResponse = await axios.post('http://localhost:3000/file/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type for file upload
            },
          });

          if (fileResponse.status === 201) {
            alert('File uploaded successfully!');
          }
        }

        // Clear the input fields after sending
        setMessage('');
        setFile(null);
      }
    } catch (err) {
      console.error('Error sending message or uploading file:', err);
      alert('Failed to send message or upload file. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Update the file state
    }
  };

  return (
    <div className="message-input-container">
      {/* Message Input */}
      <TextField
        className="message-input"
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
      />
      {/* File Upload Button */}
      <IconButton
        className="file-upload-button"
        component="label"
        color="primary"
      >
        <AttachFileIcon />
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </IconButton>
      {/* Send Button */}
      <Button
        className="send-button"
        variant="contained"
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </div>
  );
};

export default MessageInput;