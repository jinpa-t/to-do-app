import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.js";

function LogoutButton() {
  const { logout } = useAuth(); // Safely call the hook at the top level
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post('http://localhost:3030/api/user/logout', {}, {
          withCredentials: true // Crucial to send/receive cookies
        });
      } catch (error) {
        console.error("Backend logout failed", error);
      } finally {
        logout(); // Call context logout
        navigate('/login'); // Redirect safely using react-router
      }
    };

    performLogout();
  }, [logout, navigate]);

  return null;
}

export default LogoutButton;