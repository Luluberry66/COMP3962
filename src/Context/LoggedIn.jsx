import React, { createContext, useState } from "react";

export const UserInfoContext = createContext(null);

const UserInfoProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    email,
    setEmail,
    username,
    setUsername,
  };

  return (
    <UserInfoContext.Provider value={contextValue}>
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;