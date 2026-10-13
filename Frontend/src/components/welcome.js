import React, { useState } from "react";
import Logout from './logout';
import CustomCalendar from "./CustomCalendar";
import List from "./list";

const Welcome = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const login = () => {
    fetch("http://localhost:3030/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div className="home-page">
      <div className="fs-4">Welcome to Codium. Write, Collaborate, Innovate, and Share next generation of software systems.</div>
      <button onClick={() => setIsVisible(!isVisible)}>
        Logout
        {isVisible ? "" : <Logout />}
      </button>
      <h2>To-Do List</h2>
      <List />
      <br />
      <CustomCalendar />
    </div>
  );
};

export default Welcome;
