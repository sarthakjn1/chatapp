const express = require('express');
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const fileRoutes = require('./routes/fileRoutes');
const { errorHandler } = require('./utils/errorHandler');

const app = express();

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// Routes
app.use('/auth', authRoutes);
app.use('/message', messageRoutes);
app.use('/file', fileRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;