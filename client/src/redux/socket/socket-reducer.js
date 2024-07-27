import io from 'socket.io-client';

export const connectSocket = () => (dispatch, getState) => {
  const token = getState().auth.token; // Assuming token is stored in auth state
  if (!token) {
    console.error('No token available for WebSocket connection');
    return;
  }
  const socket = io(process.env.REACT_APP_API_URL, {
    query: { token },
  });

  socket.on('connect', () => {
    console.log('WebSocket connected');
    // Dispatch any actions needed on successful connection
  });

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
    // Dispatch any actions needed on disconnection
  });

  // Handle other socket events as needed
};