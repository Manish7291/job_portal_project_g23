const io = require('socket.io');

// Store active user connections
const userConnections = new Map();

const initializeSocket = (server) => {
  const socket = io(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST']
    }
  });

  // Handle user connection
  socket.on('connection', (userSocket) => {
    console.log(`User connected: ${userSocket.id}`);

    // User joins a room with their user ID
    userSocket.on('user:join', (userId) => {
      userSocket.join(`user:${userId}`);
      userConnections.set(userId, userSocket.id);
      console.log(`User ${userId} joined room user:${userId}`);
    });

    // Recruiter joins applicants room for a specific job
    userSocket.on('recruiter:joinApplicants', (jobId) => {
      userSocket.join(`job:${jobId}:applicants`);
      console.log(`Recruiter joined room job:${jobId}:applicants`);
    });

    // Recruiter leaves applicants room
    userSocket.on('recruiter:leaveApplicants', (jobId) => {
      userSocket.leave(`job:${jobId}:applicants`);
      console.log(`Recruiter left room job:${jobId}:applicants`);
    });

    // Student joins their applications updates room
    userSocket.on('student:joinApplications', (studentId) => {
      userSocket.join(`student:${studentId}:applications`);
      console.log(`Student ${studentId} joined applications room`);
    });

    // Student leaves applications room
    userSocket.on('student:leaveApplications', (studentId) => {
      userSocket.leave(`student:${studentId}:applications`);
      console.log(`Student ${studentId} left applications room`);
    });

    // Handle disconnect
    userSocket.on('disconnect', () => {
      console.log(`User disconnected: ${userSocket.id}`);
      // Remove from active connections
      for (let [userId, socketId] of userConnections.entries()) {
        if (socketId === userSocket.id) {
          userConnections.delete(userId);
          break;
        }
      }
    });
  });

  return socket;
};

// Emit application status update to recruiter and student
const emitApplicationStatusUpdate = (io, applicationData) => {
  const { applicationId, jobId, studentId, status, applicantName, jobTitle } = applicationData;

  // Notify recruiter viewing applicants list
  io.to(`job:${jobId}:applicants`).emit('application:statusUpdated', {
    applicationId,
    status,
    timestamp: new Date()
  });

  // Notify student about their application status change
  io.to(`student:${studentId}:applications`).emit('application:statusUpdated', {
    applicationId,
    jobId,
    jobTitle,
    status,
    timestamp: new Date()
  });

  console.log(`Status update emitted: Application ${applicationId} -> ${status}`);
};

// Emit new application notification to recruiter
const emitNewApplication = (io, applicationData) => {
  const { jobId, applicantName, applicantId } = applicationData;

  io.to(`job:${jobId}:applicants`).emit('application:new', {
    jobId,
    applicantName,
    applicantId,
    timestamp: new Date()
  });

  console.log(`New application emitted for job ${jobId}`);
};

module.exports = {
  initializeSocket,
  emitApplicationStatusUpdate,
  emitNewApplication
};
