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
4. [Testing](#testing)
5. [Deployment](#deployment)
6. [Future Enhancements](#future-enhancements)

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
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install