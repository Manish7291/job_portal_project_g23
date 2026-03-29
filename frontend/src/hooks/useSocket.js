import { useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to socket server
    socketRef.current = io(
      process.env.REACT_APP_API_URL || 'http://localhost:5000',
      {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        transports: ['websocket']
      }
    );

    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current.id);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const joinRoom = useCallback((eventName, roomId) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, roomId);
    }
  }, []);

  const leaveRoom = useCallback((eventName, roomId) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, roomId);
    }
  }, []);

  const listenToEvent = useCallback((eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
    }
  }, []);

  const unlistenFromEvent = useCallback((eventName) => {
    if (socketRef.current) {
      socketRef.current.off(eventName);
    }
  }, []);

  return {
    socket: socketRef.current,
    joinRoom,
    leaveRoom,
    listenToEvent,
    unlistenFromEvent
  };
};

export default useSocket;
