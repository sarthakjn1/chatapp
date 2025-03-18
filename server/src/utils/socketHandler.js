const socketIO = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: '*', // Allow all origins (update this for production)
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle real-time messaging
    socket.on('sendMessage', (message) => {
      console.log('Message received:', message);
      io.emit('receiveMessage', message); // Broadcast the message to all clients
    });

    // Handle file uploads
    socket.on('uploadFile', (fileData) => {
      console.log('File received:', fileData);
      io.emit('receiveFile', fileData); // Broadcast the file to all clients
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

module.exports = { initializeSocket, getIO };