import { Component } from "react";
import Logout  from './logout';
import CustomCalendar from "./CustomCalendar";
import List from "./list";
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      data: null,
      isVisible: true
    };
  }
  
  login = () => {
    fetch("http://localhost:3030/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        email: this.state.email,
        password: this.state.password,
      })
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful login
        this.setState({ data: data });
        
      })
      .catch((error) => {
        // Handle errors here
        console.error("Login error:", error);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="fs-4">Welcome to Codium. Write, Collaborate, Innovate, and Share next generation of software systems.</div>
        <button onClick={() => {!this.state.isVisible}}>
          Logout
          {this.state.isVisible ? "" : <Logout />}
        </button>
        <h2>To-Do List</h2>
        <List></List>
        <CustomCalendar></CustomCalendar>
      </div>
    );
  }
}
export default Welcome;
