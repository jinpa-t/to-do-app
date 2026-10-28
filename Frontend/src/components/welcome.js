import React, { useState } from "react";
import CustomCalendar from "./CustomCalendar";
import List from "./list";

const Welcome = () => {

  return (
    <div className="home-page">
      <div className="fs-4">Welcome to Codium. Write, Collaborate, Innovate, and Share next generation of software systems.</div>
      <h2>To-Do List</h2>
      <List />
      <br />
      <CustomCalendar />
    </div>
  );
};

export default Welcome;
