import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("Users");
  let parsedUser = undefined;
  try {
    if (initialAuthUser && initialAuthUser !== "undefined") {
      parsedUser = JSON.parse(initialAuthUser);
    }
  } catch (error) {
    console.error("Failed to parse user from local storage", error);
    localStorage.removeItem("Users");
  }
  const [authUser, setAuthUser] = useState(parsedUser);
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
