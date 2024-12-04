import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  console.log('AuthProvider rendered');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleSignIn = (credentials) => {
    setIsLoggedIn(true);
    setUsername(credentials.email.split('@')[0]);
  };

  const handleSignUp = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.name);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        username,
        handleSignIn,
        handleSignUp,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};