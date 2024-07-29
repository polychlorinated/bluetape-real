export const getStoredAuthToken = () => localStorage.getItem("authToken");

export const getStoredRefreshToken = () => localStorage.getItem("refreshToken");

export const setStoredAuthToken = (token) => localStorage.setItem("authToken", token);

export const setStoredRefreshToken = (token) => localStorage.setItem("refreshToken", token);

export const removeStoredAuthToken = () => localStorage.removeItem("authToken");

export const removeStoredRefreshToken = () => localStorage.removeItem("refreshToken");