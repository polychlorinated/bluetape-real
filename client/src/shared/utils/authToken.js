export const getStoredAuthToken = () => localStorage.getItem("authToken");

export const getStoredRefreshToken = () => localStorage.getItem("refreshToken");

export const storeAuthToken = token => localStorage.setItem("authToken", token);

export const storeRefreshToken = token =>
  localStorage.setItem("refreshToken", token);

export const removeStoredAuthToken = () => localStorage.removeItem("authToken");
