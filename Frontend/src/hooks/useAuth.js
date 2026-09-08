// frontend/hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAuth() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/user/verify', {
          withCredentials: true // Crucial if your token is stored in a cookie
        });
        
        setAuthState({
          isAuthenticated: true,
          user: response.data.user,
          loading: false,
          error: null
        });
      } catch (err) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    };

    verifyUser();
  }, []);

  return authState;
}
