import React from 'react';
import PropTypes from 'prop-types';
import { LogIn, UserCircle } from 'lucide-react';

const AuthButton = ({ isLoggedIn, username, onSignIn, onSignUp, onSignOut }) => {
  if (isLoggedIn) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <UserCircle className="h-8 w-8" />
          <span className="text-sm font-medium">{username}</span>
        </div>
        <button
          onClick={onSignOut}
          className="text-white hover:text-emerald-200 transition-colors text-sm"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onSignIn}
        className="flex items-center space-x-1 text-white hover:text-emerald-200 transition-colors"
      >
        <LogIn className="h-4 w-4" />
        <span>Sign In</span>
      </button>
      <button
        onClick={onSignUp}
        className="bg-white text-emerald-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-emerald-50 transition-colors"
      >
        Sign Up
      </button>
    </div>
  );
};



export default AuthButton;