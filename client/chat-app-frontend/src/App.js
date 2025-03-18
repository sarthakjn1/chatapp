import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ChatInterface from './components/Chat/ChatInterface';
import { ChatProvider } from './context/ChatContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/chat"
            element={isAuthenticated ? <ChatInterface /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
};

export default App;