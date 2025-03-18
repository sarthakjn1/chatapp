import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user
  const [messages, setMessages] = useState([]); // Track messages for the selected user
  const [userIdToUsernameMap, setUserIdToUsernameMap] = useState({}); // Map of user_id to username

  return (
    <ChatContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        messages,
        setMessages,
        userIdToUsernameMap,
        setUserIdToUsernameMap,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};