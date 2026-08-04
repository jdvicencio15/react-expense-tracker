import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

  const [token, setToken] = useState(
  localStorage.getItem("token") ||
  sessionStorage.getItem("token") ||
  ""
    );

    const [loading, setLoading] = useState(true);




  // Keep user logged in after page refresh
useEffect(() => {

  const savedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  const savedToken =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");


  if (savedUser && savedToken) {
    setUser(JSON.parse(savedUser));
    setToken(savedToken);
  }


  setLoading(false);

}, []);

  // Register
 async function register(userData) {

  const response = await apiRegister(userData);

  return response;

}

  // Login
  async function login(userData) {

  const response = await apiLogin(userData);

  setUser(response.data);
  setToken(response.token);


  const storage = userData.rememberMe
    ? localStorage
    : sessionStorage;


  storage.setItem(
    "user",
    JSON.stringify(response.data)
  );

  storage.setItem(
    "token",
    response.token
  );


  return response;
}

  // Logout
 function logout() {

  setUser(null);
  setToken("");

 localStorage.removeItem("user");
localStorage.removeItem("token");

sessionStorage.removeItem("user");
sessionStorage.removeItem("token");

  // Remove old local storage data
  localStorage.removeItem("expenses");
  localStorage.removeItem("budget");
  localStorage.removeItem("creditCards");
}

  return (
  <AuthContext.Provider
 value={{
  user,
  token,
  loading,
  isAuthenticated: !!token,
  register,
  login,
  logout,
 }}
>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}