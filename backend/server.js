const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const connectDB = require('./config/db');
const app = require('./app');
const { initializeSocket } = require('./services/socketService');

const PORT = process.env.PORT || 5000;

// Create HTTP server with Express app
const server = http.createServer(app);

// Initialize Socket.io
const io = initializeSocket(server);

// Make io accessible to routes
app.set('io', io);

// Connect to database and start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`JOBFLUX Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Socket.io initialized for real-time updates`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});
