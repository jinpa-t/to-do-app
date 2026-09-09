import React, { Component } from 'react';
import axios from 'axios';

class LogoutButton extends Component {
  constructor(props) {
    super(props);
  }
  
  async componentDidMount() {
    try {
      // 1. Tell backend to clear the HttpOnly cookie
      await axios.post('http://localhost:3030/api/user/logout', {}, {
        withCredentials: true // Crucial to send/receive cookies
      });
    } catch (error) {
      console.error("Backend logout failed", error);
    } finally {
      // 2. Clear frontend user state passed down via props
      // this.props.setUserState(null); 
      
      // 3. Redirect using a custom prop or a classical history push
      if (this.props.navigate) {
        this.props.navigate('/login');
      } else {
        window.location.href = '/login'; // Fallback redirect if no router prop
      }
    }
  }

  render() {
    return null;
  }
}

export default LogoutButton;
