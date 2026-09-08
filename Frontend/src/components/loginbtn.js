import React from 'react';
import { useAuth } from '../context/AuthContext.js';

const LoginButton = () => {
  const { login, logout, isLoggedIn, user } = useAuth();

  if (isLoggedIn) {
    return (
      <div>
        <p>Welcome back, {user?.name}!</p>
        <button onClick={logout}>Log Out</button>
      </div>
    );
  }

  const handleDummyLogin = () => {
    // Simulate an API response payload
    const mockUser = { id: 1, name: 'Alex' };
    login(mockUser);
  };

  return <button onClick={handleDummyLogin}>Log In</button>;
};

export default LoginButton;
