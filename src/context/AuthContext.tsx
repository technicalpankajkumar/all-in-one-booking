import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let user = JSON.parse(localStorage.getItem("user")) || {};

  // Check token on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
console.log(user,'useAuth')
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated ,user}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
