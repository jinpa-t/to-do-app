import { Component } from "react";
import { Navigate } from "react-router-dom";
import LoginBtn from "../components/loginbtn";
import { useAuth } from '../context/AuthContext.js';

const Login = () => {
  const [isLoggedInLocal, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("abc123@gmail.com");
  const [password, setPassword] = useState("123123");
  const { login, logout, isLoggedIn, user } = useAuth();
  const loginAPI = () => {
    fetch("http://localhost:3030/api/user/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((data) => {
      setIsLoggedIn(true);
      const mockUser = { id: 1, name: 'Alex' };
      login(mockUser);
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
  };

  if (isLoggedInLocal) {
    return <Navigate to="/welcome" replace={true} />;
  }

  return (
    <div className="App">
      <div className="fs-4">Already have an account? Login Below</div>
      <div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          className="mb-2 ms-2 border border-primary"
          autoComplete="false"
          value={email}
          title="Email"
        />
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          placeholder="●●●●●●●●●●●"
          className="border border-primary mb-2 ms-2"
          autoComplete="false"
          value={password}
          title="Password"
        />
        <br />
        <button
          onClick={loginAPI}
          type="submit"
          className="btn btn-primary"
        >Login</button>
      </div>
      <LoginBtn />
      <div className="fs-4">New to Codium? Sign up <a href="/signup">here</a></div>
    </div>
  );
};

export default Login;
