const amqp = require('amqplib');

class MessageQueueService {
  constructor() {
    this.channel = null;
    this.queueName = 'message_queue';
    this.connection = null;
  }

  async connect() {
    if (this.connection) return; // Avoid reconnecting if already connected

    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queueName, { durable: true });
    console.log('Connected to RabbitMQ');
  }

  async enqueueMessage(message) {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }

    // Assign a sequence number to the message
    const sequenceNumber = await this.getNextSequenceNumber();
    message.sequence_number = sequenceNumber;

    // Send the message to the queue
    this.channel.sendToQueue(
      this.queueName,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );

    console.log('Message enqueued:', message);
  }

  async getNextSequenceNumber() {
    // In a real-world scenario, you might use a database or Redis to generate a unique sequence number
    return Date.now(); // Use timestamp as a simple sequence number for demonstration
  }

  async consumeMessages(callback) {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }

    this.channel.consume(this.queueName, (msg) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        callback(message); // Process the message
        this.channel.ack(msg); // Acknowledge the message
      }
    });

    console.log('Waiting for messages...');
  }
}

// Singleton instance of MessageQueueService
const messageQueueService = new MessageQueueService();
module.exports = messageQueueService;