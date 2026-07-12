import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("staylytics_token"));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("staylytics_user");
    return u ? JSON.parse(u) : null;
  });

  const login = (token, user) => {
    localStorage.setItem("staylytics_token", token);
    localStorage.setItem("staylytics_user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("staylytics_token");
    localStorage.removeItem("staylytics_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}
