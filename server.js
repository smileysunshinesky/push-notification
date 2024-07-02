const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow all origins for development (adjust in production)
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Simulate a new message event for testing
  setTimeout(() => {
    socket.emit('newMessage', {
      title: 'New Message',
      body: 'You have received a new message!',
      icon: 'https://via.placeholder.com/128' // Placeholder icon URL
    });
  }, 5000); // Send a message after 5 seconds for testing

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('Socket.io server is running');
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
