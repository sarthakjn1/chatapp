import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ChatContext } from '../../context/ChatContext';

const MessageInput = () => {
  const [message, setMessage] = useState(''); // State to store the message content
  const [file, setFile] = useState(null); // State to store the selected file
  const { selectedUser, messages, setMessages } = useContext(ChatContext); // Access selectedUser and setMessages from context
  const loggedInUserId = localStorage.getItem('user_id'); // Get logged-in user's ID

  const fetchLatestMessages = async () => {
    try {
      // Fetch the latest messages for the selected user
      const response = await axios.get('http://localhost:3000/message', {
        params: {
          senderId: loggedInUserId,
          receiverId: selectedUser.id,
        },
      });

      // Update the messages in the context
      setMessages(response.data?.data?.messages || []);
    } catch (err) {
      console.error('Failed to fetch latest messages:', err);
    }
  };


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
         // Optimistic Update: Add the sent message to the messages state immediately
         const newMessage = {
          sequence_number: sequenceNumber, // Use sequence_number as the message ID
          content: message,
          sender_id: +loggedInUserId,
          receiver_id: selectedUser.id,
          createdAt: new Date().toISOString(), // Use the current time as the created time
          status: 'sent', // Assume the message is sent
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

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
        // Step 3: Fetch the latest messages and update the UI
        await fetchLatestMessages();

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
    <div className="d-flex align-items-center">
      {/* Message Input */}
      <input
        type="text"
        className="form-control me-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />

      {/* File Upload Input */}
      <input
        type="file"
        className="form-control me-2"
        onChange={handleFileChange}
        style={{ width: 'auto' }} // Adjust the width of the file input
      />

      {/* Send Button */}
      <button className="btn btn-primary" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;