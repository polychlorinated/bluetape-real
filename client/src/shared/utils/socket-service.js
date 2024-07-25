import io from 'socket.io-client';
import { getStoredAuthToken } from './authToken';

export const socketService = {
  connect,
};

function connect() {
  return new Promise((resolve, reject) => {
    const socket = io(
      process.env.NODE_ENV === 'development'
        ? 'https://testapi.bluetape.io'
        : 'https://localhost:5000',
      {
        query: { token: getStoredAuthToken() },
      }
    );
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}
