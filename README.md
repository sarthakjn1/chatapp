# Chat Application

This is a **full-stack chat application** built with **Node.js** (backend) and **React** (frontend). The application allows users to send real-time messages, upload files, and view conversations between users. It is designed to handle network failures, ensure message delivery, and provide a seamless user experience.

---

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
   - [Database](#database)
   - [Message Queue (RabbitMQ)](#message-queue-rabbitmq)
   - [API Design](#api-design)
3. [Setup](#setup)
   - [Backend](#backend)
   - [Frontend](#frontend)
4. [AI tools leveraged](#ai-tools-used)
5. [Testing](#testing)

---

## Features

- **Real-Time Messaging**: Users can send and receive messages in real-time using WebSockets.
- **File Uploads**: Users can upload images, documents, videos, and audio files.
- **Message Queue**: RabbitMQ ensures reliable message delivery even during network failures.
- **Offline Support**: Messages are queued and delivered when the user comes online.
- **User Management**: Fetch all users except the logged-in user.
- **Message History**: Fetch all messages between two users, sorted by creation time.

---

## Architecture

### Database
- **MySQL** is used as the primary database.
- **Tables**:
  - `users`: Stores user information (e.g., `user_id`, `username`, `email`, `password_hash`).
  - `messages`: Stores chat messages (e.g., `message_id`, `sender_id`, `receiver_id`, `content`, `createdAt`).
  - `files`: Stores metadata for uploaded files (e.g., `file_id`, `message_id`, `file_url`, `file_type`, `file_size`).
- **Relationships**:
  - A `message` belongs to a `user` (sender and receiver).
  - A `file` belongs to a `message`.

### Message Queue (RabbitMQ)
- **RabbitMQ** is used to handle message queuing and ensure reliable delivery.
- **Why RabbitMQ?**
  - Ensures messages are not lost during network failures.
  - Provides a scalable and decoupled architecture.
- **How It Works**:
  - Messages and files are enqueued in RabbitMQ.
  - A consumer processes the queue and saves messages/files to the database.
  - Real-time updates are sent to clients via WebSockets.

### API Design
The backend follows a **RESTful API design** with the following endpoints:

#### **Auth Routes**
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in a user and return a JWT token.

#### **Message Routes**
- `POST /message/send`: Send a message.
- `GET /message/messages`: Fetch messages between two users (sorted by `createdAt` in descending order).

#### **File Routes**
- `POST /file/upload`: Upload a file.

#### **User Routes**
- `GET /user/users`: Fetch all users except the logged-in user.

---

## Setup

### Backend

#### **1. Install Dependencies**
Navigate to the `server` folder and install dependencies:
```bash
cd server
npm install
```

#### **2. Setup the database**
Create a MySQL database named chat_app.

Update the database credentials in config/config.json.

#### **3. Run Migrations**
Run Sequelize migrations to create the database tables:

```bash
npx sequelize-cli db:migrate
```

#### **4. Start the Backend Server**
Start the backend server:

```bash
npm run dev
```
The backend will run on http://localhost:3000

### Client

#### **1. Install Dependencies**
Navigate to the `client\chat-app-frontend` folder and install dependencies:
```bash
cd client/chat-app-frontend
npm install
```

#### **4. Start the Backend Server**
Start the frontend server:

```bash
npm run dev
```

## AI Tools Used

During the development of this project, I leveraged **AI tools** to assist with various aspects of the application:

- **DeepSeek**: Used for generating boilerplate code, suggesting best practices, and optimizing the front-end design. DeepSeek helped streamline the development process by providing quick solutions to complex problems.
  
- **GitHub Copilot**: Assisted with writing backend logic, API design, and database queries. Copilot's suggestions significantly sped up the development process, especially when working on repetitive tasks or debugging code.

These AI tools were instrumental in:
- **Front-End Design**: Generating responsive and modern UI components using Material UI.
- **Backend Architecture**: Suggesting modular and scalable code structures for the Node.js backend and message queue.
- **API Design**: Providing insights into RESTful API best practices and endpoint design.

## Testing

### Backend
Use Postman or cURL to test the API endpoints.

Example: Fetch messages between two users:

```bash
curl "http://localhost:3000/message/messages?senderId=1&receiverId=2"
```
### Frontend
Open the React app in your browser (http://localhost:3001).

Send messages, upload files, and verify the UI updates in real-time.