// src/socket.js
import { io } from "socket.io-client";

// Use environment variable for server URL, fallback to localhost for development
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

export const socket = io(SERVER_URL, {
  autoConnect: false,
  transports: ['websocket', 'polling']
});
