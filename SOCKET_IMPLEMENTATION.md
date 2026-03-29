# Real-Time Socket.io Implementation - JOBFLUX

## Overview
This document describes the real-time socket.io implementation for live application status updates in JOBFLUX.

## Features Implemented

### 1. **Real-Time Application Status Updates**
- When a recruiter updates an application status (viewed, shortlisted, interview, rejected, selected), all connected users are notified immediately
- No page refresh required

### 2. **Real-Time Notifications**
- Students receive instant notifications when their application status changes
- Recruiters see live updates of applicant statuses

### 3. **Room-Based Communication**
- Uses socket.io rooms for scalable broadcasting
- `job:{jobId}:applicants` - Room for recruiters viewing applicants of a specific job
- `student:{studentId}:applications` - Room for students tracking their applications
- `user:{userId}` - General user room for other updates

## Backend Implementation

### Socket Service (`backend/services/socketService.js`)
```javascript
- initializeSocket() - Initialize socket.io server
- emitApplicationStatusUpdate() - Emit when status changes
- emitNewApplication() - Emit when new application submitted
```

### Server Setup (`backend/server.js`)
- HTTP server created with Express
- Socket.io initialized with CORS and WebSocket transport
- `io` instance made available to routes via `app.set('io', io)`

### Application Controller Updates
- `applyToJob()` - Emits newApplication event
- `updateStatus()` - Emits statusUpdated event with Job ID, Student ID, and new status

## Frontend Implementation

### Socket Hook (`frontend/src/hooks/useSocket.js`)
Custom React hook providing:
- `joinRoom()` - Join a socket room
- `leaveRoom()` - Leave a socket room
- `listenToEvent()` - Listen for socket events
- `unlistenFromEvent()` - Remove event listeners

### Recruiter Applicants Component
- Displays list of applicants with real-time status
- Status changes are reflected immediately
- New applications appear without refresh

### Student Applications Component
- Shows all student applications
- Real-time status badges with emojis
- Contextual messages for different statuses (interview, selected, rejected)

## Socket Events

### Emitted from Backend
1. `application:statusUpdated`
   - Payload: { applicationId, jobId, studentId, status, timestamp }
   - Sent to: `job:{jobId}:applicants` and `student:{studentId}:applications`

2. `application:new`
   - Payload: { jobId, applicantName, applicantId, timestamp }
   - Sent to: `job:{jobId}:applicants`

### Emitted from Frontend
1. `user:join` - User joins general room
2. `recruiter:joinApplicants` - Recruiter joins applicants room
3. `recruiter:leaveApplicants` - Recruiter leaves applicants room
4. `student:joinApplications` - Student joins applications room
5. `student:leaveApplications` - Student leaves applications room

## How It Works

### For Recruiters
1. Navigate to applicants page for a job
2. Frontend joins `job:{jobId}:applicants` room
3. Update applicant status
4. Backend emits `application:statusUpdated` event
5. All connected recruiters see the update immediately
6. Student receives notification in their applications page

### For Students
1. Login and go to applications page
2. Frontend joins `student:{studentId}:applications` room
3. When recruiter updates status, student receives real-time notification
4. Application status badge updates automatically
5. Contextual messages appear (e.g., "Congratulations! You've been selected!")

## Testing

### Test Real-Time Updates
1. Open two browser windows (recruiter and student)
2. Student applies to job
3. Recruiter sees new applicant without refresh
4. Recruiter updates status
5. Student sees status change immediately without refresh

### Test Multiple Connections
- Open recruiter view in multiple tabs
- Update status in one tab
- See update in all tabs instantly

## Files Modified/Created

### Backend
- `backend/server.js` - HTTP server with Socket.io
- `backend/services/socketService.js` - Socket event handlers
- `backend/controllers/applicationController.js` - Socket event emissions

### Frontend
- `frontend/src/hooks/useSocket.js` - Socket.io custom hook
- `frontend/src/pages/recruiter/Applicants.jsx` - Recruiter real-time applicants
- `frontend/src/pages/student/Applications.jsx` - Student real-time applications

### Dependencies Added
- Backend: `socket.io`
- Frontend: `socket.io-client`

## Performance Considerations

1. **Scalability**: Socket.io rooms prevent unnecessary broadcasts
2. **Re-connections**: Automatic reconnection with exponential backoff
3. **Error Handling**: Graceful fallback to HTTP polling if needed
4. **Memory**: Old listeners are cleaned up on component unmount

## Future Enhancements

1. Add Redis adapter for multi-server deployments
2. Implement typing indicators for form submissions
3. Add presence indicators (online/offline status)
4. Real-time interview scheduling
5. Live notifications with sound/vibration
6. Message push notifications

---

**Implemented by:** Manish  
**Date:** March 29, 2026  
**Version:** 1.0
