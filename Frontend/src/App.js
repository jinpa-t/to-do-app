import { BrowserRouter, Route, PrefetchPageLinks } from "react-router-dom";
import { Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/login";
import Signup from "./components/signup";
import About from "./components/About";
import Welcome from "./components/welcome";
import Logout from "./components/logout";
import Posts from "./components/Posts";

import "./styles.css";
import List from "./components/list.js";
import CustomCalendar from "./components/CustomCalendar.js";

export default function App() {
  return (
    <div>
      <div className="App bg-dark">
        <span className="fs-3"><span className="text-info">C</span>o<span className="text-info">d</span>i<span className="text-info">u</span>m</span>
        <span className="fs-6"> Where magic happens</span>
        <nav className="">
          <a href="/welcome" className="btn btn-primary me-2">Home</a>
          <a href="/posts" className="btn btn-primary me-2">Posts</a>
          <a href="/about" className="btn btn-primary me-2">About</a>
          <a href="/login" className="btn btn-primary me-2">Login</a>
          <a href="/logout" className="btn btn-primary me-2">Logout</a>
        </nav>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            
            <Route path="/" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/welcome" element={<Welcome />}></Route>
              <Route path="/posts" element={<Posts />} />
            </Route>
          </Routes>
        </BrowserRouter>
        
        <footer className="footer">
          <p className="text-center">Powered by <em>React</em> and <em>Node.js</em> &copy; 2026</p>
        </footer>
      </div>          
    </div>
  );
}
