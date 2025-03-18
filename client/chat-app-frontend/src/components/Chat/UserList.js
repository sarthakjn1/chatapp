import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ChatContext } from '../../context/ChatContext';

const UserList = () => {
  const { selectedUser, setSelectedUser, setMessages, setUserIdToUsernameMap } = useContext(ChatContext); // Access context
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(''); // State to handle errors
  const [emailToIdMap, setEmailToIdMap] = useState({}); // Map of email to user_id

  useEffect(() => {
    const fetchUsers = async () => {
      // Fetch the logged-in user's email from localStorage
      const userEmail = localStorage.getItem('user_email');

      if (!userEmail) {
        setError('User email not found in localStorage.');
        setLoading(false);
        return;
      }

      try {
        // Make the API call to fetch users
        const response = await axios.get(`http://localhost:3000/user${userEmail ? `?email=${userEmail}` : ''}`);
        console.log('API Response:', response); // Log the entire response for debugging

        // Extract users from the response
        const users = response.data?.data?.users; // Use optional chaining to safely access nested properties

        // Check if users is an array
        if (Array.isArray(users)) {
          setUsers(users); // Update state with users

          // Create a map of email to user_id
          const emailMap = {};
          // Create a map of user_id to username
          const idToUsernameMap = {};
          users.forEach((user) => {
            emailMap[user.email] = user.id;
            idToUsernameMap[user.id] = user.username;
          });
          setEmailToIdMap(emailMap);
          setUserIdToUsernameMap(idToUsernameMap); // Update context with the map

          // Select the first user by default
          if (users.length > 0) {
            setSelectedUser(users[0]); // Set the first user as selected
            fetchMessages(users[0].id); // Fetch messages for the first user
          }
        } else {
          setError('Invalid response format: users is not an array.');
        }
      } catch (err) {
        setError('Failed to fetch users. Please try again.'); // Handle errors
        console.error('API Error:', err);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchUsers(); // Call the async function
  }, [setSelectedUser, setUserIdToUsernameMap]); // Add setSelectedUser and setUserIdToUsernameMap to dependency array

  const fetchMessages = async (selectedUserId) => {
    const loggedInUserId = localStorage.getItem('user_id'); // Get logged-in user's ID

    if (!loggedInUserId || !selectedUserId) {
      setError('User ID not found in localStorage.');
      return;
    }

    try {
      // Fetch messages common to both users
      const response = await axios.get(`http://localhost:3000/message${loggedInUserId ? `?senderId=${loggedInUserId}` : ''}${selectedUserId ? `&receiverId=${selectedUserId}` : ''}`);


      // Update messages in the context
      setMessages(response.data?.data?.messages || []);
    } catch (err) {
      setError('Failed to fetch messages. Please try again.');
      console.error('API Error:', err);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user); // Update the selected user in the context
    fetchMessages(user.id); // Fetch messages for the selected user
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>; // Show error message
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Users</h3>
        <ul className="list-group">
          {users.map((user, index) => (
            <li
              key={index}
              className={`list-group-item ${selectedUser?.id === user.id ? 'active' : ''}`}
              onClick={() => handleUserClick(user)} // Handle user selection
              style={{ cursor: 'pointer' }} // Make it look clickable
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;