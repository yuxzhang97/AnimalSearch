import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("65e23f2d19d6d1c8e7b5103f"); //hard coded user for testing

  const logIn = (id) => {
    setUserId(id);
  };

  const logOut = () => {
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
