import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Safe parse function
  const getStoredUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      // Check agar empty ya "undefined" string ho
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    const parsedUser = getStoredUser();
    if (parsedUser) {
      setUser(parsedUser);
    } else {
      localStorage.removeItem("user"); // corrupted data clean
    }
  }, []);

  // ✅ Helper: login user
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ Helper: logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // agar token bhi store karte ho
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
