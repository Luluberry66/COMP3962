import React, { createContext, useState, useEffect } from "react";

export const UserInfoContext = createContext(null);

const UserInfoProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch('/isLoggedIn', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsLoggedIn(true);
          setEmail(data.email);
        }
      });
  }, []);

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