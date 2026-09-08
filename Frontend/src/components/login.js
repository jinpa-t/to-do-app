import { Component } from "react";
import { Navigate } from "react-router-dom";
import LoginBtn from "../components/loginbtn";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: "abc123@gmail.com",
      password: "123123",
    };
    this.login = this.login.bind(this)
  }
  

  componentDidMount = () => {

  }
  updateEmail = (ev) => {
    let value = ev.target.value;
    this.setState({ email: value });
  };

  updatePass = (e) => {
    let value = e.target.value;
    this.setState({ password: value });
  };
  
  login = () => {
    
    console.log("Form submitted.", this.state.email, " ", this.state.password);
    fetch("http://localhost:3030/api/user/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        email: this.state.email,
        password: this.state.password,
        
      }),
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((data) => {
        
        // Handle successful login
        this.setState({ data: data });
        console.log("Server API fetch successful :", data);
        this.setState({isLoggedIn : true});
        
        //window.location.reload();
      })
      .catch((error) => {
        // Handle errors here
        console.error("Login error:", error);
      });
  };

  render() {
    
    if (this.state.isLoggedIn) {
      return <Navigate to="/welcome" replace={true} />;
    }
    return (
      
      <div className="App">
        <div className="fs-4">Already have an account? Login Below</div>
        <div>
          <input
            onChange={this.updateEmail}
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            className="mb-2 ms-2 border border-primary"
            autoComplete="false"
            value="abc123@gmail.com"
            title="Email"
          ></input>
          {/* <label htmlFor="email">Email </label> */}
          <br />
          <input
            onChange={this.updatePass}
            type="password"
            id="password"
            name="password"
            placeholder="●●●●●●●●●●●"
            className="border border-primary mb-2 ms-2"
            autoComplete="false"
            value="123123"
            title="Password"
          ></input>
          {/* <label htmlFor="password">Password </label> */}
          <br />
          <button
            onClick={this.login}
            type="submit"
            className="btn btn-primary"
          >Login</button>
          
        </div>
        <LoginBtn />
        <div className="fs-4">New to Codium? Sign up <a href="/signup">here</a></div>
      </div>
    );
  }
}
export default Login;
