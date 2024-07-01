const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create a new Express application
const app = express();

// Create a new HTTP server and attach the Express app
const server = http.createServer(app);

// Create a new Socket.io instance and attach it to the HTTP server
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow all origins for development (adjust in production)
    methods: ['GET', 'POST']
  }
});

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit a new message event to the client
  socket.emit('newMessage', {
    title: 'New Message',
    body: 'You have received a new message!',
    icon: 'https://via.placeholder.com/128' // Placeholder icon URL
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Socket.io server is running');
});

// Start the server on port 3001
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
