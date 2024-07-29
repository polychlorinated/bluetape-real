import io from 'socket.io-client';
import { getStoredAuthToken } from './authToken';

export const socketService = {
  connect,
};

function connect() {
  return new Promise((resolve, reject) => {
    const socket = io(
      process.env.NODE_ENV === 'production'
        ? 'https://bluetape-real.onrender.com/' //removed /v1 from the end of the URL, but may need to add back if its not correct
        : 'https://localhost:10000',
      {
        query: { token: getStoredAuthToken() },
      }
    );
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}
