import { Component } from "react";
import { Navigate } from "react-router-dom";
class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
          data: null,
      };
    }

    getdata = () => {
    return this.state.data;
    };

    posts = () => {
        fetch("http://localhost:3030/api/posts/", {
        method: 'GET',
        credentials: 'include'
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({data : data});
            console.log("Posts retrieved successfully:", this.state.data);
            
            //window.location.reload();
        })
        .catch((error) => {
            // Handle errors here
            console.error("Login error:", error);
        });

      };
      componentDidMount(){
          this.posts();
      }
  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <div>
          <button
            onClick={this.posts}
            type="submit"
            className="btn btn-primary"
          >Get Posts</button>
          <div>
            <h1>Posts</h1>
            <div>{data && JSON.stringify(this.state.data, null, 2)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
