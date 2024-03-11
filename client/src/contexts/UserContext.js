import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("65e498b8630184bd51d65e32"); //hard coded user for testing

  const logIn = (id) => {
    console.log("here");
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
