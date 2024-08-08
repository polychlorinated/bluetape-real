// authService.js
import api from './api';
import { setStoredAuthToken, setStoredRefreshToken, removeStoredAuthToken, removeStoredRefreshToken } from './authToken';

export const signIn = async (email, password) => {
  try {
    const response = await api.post('/auth/signIn', { email, password });
    setStoredAuthToken(response.data.tokens.access.token);
    setStoredRefreshToken(response.data.tokens.refresh.token);
    return response.data.user;
  } catch (error) {
    console.error('Sign in failed:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await api.post('/auth/signOut');
  } catch (error) {
    console.error('Sign out failed:', error);
  } finally {
    removeStoredAuthToken();
    removeStoredRefreshToken();
  }
};