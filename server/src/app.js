const express = require('express');
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./utils/errorHandler');
const cors = require('cors');
const app = express();

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3001', // Allow only your frontend origin
    credentials: true, // Allow cookies (if needed)
  }));


// Routes
app.use('/auth', authRoutes);
app.use('/message', messageRoutes);
app.use('/file', fileRoutes);
app.use('/user', userRoutes); 

// Error handling middleware
app.use(errorHandler);

module.exports = app;