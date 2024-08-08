export const getStoredAuthToken = () => localStorage.getItem("authToken");
export const getStoredRefreshToken = () => localStorage.getItem("refreshToken");

export const setStoredAuthToken = (token) => {
  localStorage.setItem("authToken", token);
  console.log('Auth token stored');
};

export const setStoredRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
  console.log('Refresh token stored');
};

export const removeStoredAuthToken = () => {
  localStorage.removeItem("authToken");
  console.log('Auth token removed');
};

export const removeStoredRefreshToken = () => {
  localStorage.removeItem("refreshToken");
  console.log('Refresh token removed');
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
};