const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./utils/socketHandler');
const messageQueueService = require('./services/messageQueueService');
const MessageRepository = require('./repositories/messageRepository');
const FileRepository = require('./repositories/fileRepository');
const { getIO } = require('./utils/socketHandler');

const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Initialize Repositories
const messageRepository = new MessageRepository();
const fileRepository = new FileRepository();

// Connect to RabbitMQ and start consuming messages
messageQueueService.connect().then(() => {
  messageQueueService.consumeMessages(async (message) => {
    try {
      if (message.type === 'message') {
        // Save the message to the database
        const savedMessage = await messageRepository.create({
          sender_id: message.sender_id,
          receiver_id: message.receiver_id,
          content: message.content,
          sequence_number: message.sequence_number
        });

        // Emit the message to the receiver using Socket.IO
        const io = getIO();
        io.emit('receiveMessage', savedMessage);

      } else if (message.type === 'file') {
        // Save the file metadata to the database
        console.log('Processing file:', message);
        const savedFile = await fileRepository.create({
          sequence_number: message.sequence_number,
          sender_id: message.sender_id,
          receiver_id: message.receiver_id,
          file_url: message.file_url,
          file_type: message.file_type,
          file_size: message.file_size,
          upload_status: 'completed'
        });

        // Emit the file to the receiver using Socket.IO
        const io = getIO();
        io.emit('receiveFile', savedFile);

        console.log('File processed and saved:', savedFile);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});