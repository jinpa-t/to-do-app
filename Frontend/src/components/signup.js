import { Component } from "react";
import { Navigate } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
      email: "abc123@gmail.com",
      password: "123123",
    };
    this.register = this.register.bind(this)
  }
  

  componentDidMount = () => {
     
  }
  updateUsername = (ev) => {
    let value = ev.target.value;
    this.setState({ username: value });
  };
  updateEmail = (ev) => {
    let value = ev.target.value;
    this.setState({ email: value });
  };

  updatePass = (e) => {
    let value = e.target.value;
    this.setState({ password: value });
  };
  
  register = () => {
    
    console.log("Form submitted.", this.state.email, " ", this.state.password);
    fetch("http://localhost:3030/api/user/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        username: this.state.username,
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
        <div className="fs-4">Signup to Codium</div>
        <div>
          <input type="text" onChange={this.updateUsername}
            
            id="username"
            name="username"
            placeholder="Username"
            className="mb-2 ms-2 border border-primary"
            autoComplete="false"
            
            title="Username" />
          <input
            onChange={this.updateEmail}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="mb-2 ms-2 border border-primary"
            autoComplete="false"
            
            title="Email"
          ></input>
          {/* <label htmlFor="email">Email </label> */}
          <br />
          <input
            onChange={this.updatePass}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="border border-primary mb-2 ms-2"
            autoComplete="false"
            
            title="Password"
          ></input>
          <input
            onChange={this.updatePass}
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm Password"
            className="border border-primary mb-2 ms-2"
            autoComplete="false"
            
            title="Confirm Password"
          ></input>
          {/* <label htmlFor="password">Password </label> */}
          <br />
          <button
            onClick={this.login}
            type="submit"
            className="btn btn-primary"
          >Create Account</button>
          
        </div>
        <div className="fs-4">Already have an account? Login <a href="/login">here</a></div>
      </div>
    );
  }
}
export default Signup;
