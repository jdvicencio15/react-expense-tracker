import { apiRequest } from "./apiClient";


// Register new user
export function register(userData) {
  return apiRequest("/api/users/register", {
    method: "POST",

    body: JSON.stringify(userData),
  });
}



// Login existing user
export function login(userData) {
  return apiRequest("/api/users/login", {
    method: "POST",

    body: JSON.stringify(userData),
  });
}



// Forgot password
export function forgotPassword(email) {
  return apiRequest("/api/users/forgot-password", {
    method: "POST",

    body: JSON.stringify({
      email,
    }),
  });
}



// Reset password
export function resetPassword(token, password) {
  return apiRequest("/api/users/reset-password", {
    method: "POST",

    body: JSON.stringify({
      token,
      password,
    }),
  });
}