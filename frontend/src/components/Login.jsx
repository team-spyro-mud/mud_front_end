import React, { Component } from "react";
import axios from "axios";

const loginStyle = {
  width: "10%",
  border: "1px solid black",
  fontSize: "15px",
  backgroundColor: "green",
  marginTop: '5px'
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("https://mud-back-end.herokuapp.com/api/login/", this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.key);
        setTimeout(() => {
          window.location.reload();
        }, 0);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      username: "",
      password: ""
    });
  };

  handleUserChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePassChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <div className="form-styles">
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>User Name:</label>
            <input
              type="text"
              data-test="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleUserChange}
            />
          </div>
          <div>
            <label className="password-login">Password:</label>
            <input
              type="password"
              data-test="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePassChange}
            />
          </div>
          <button
            style={loginStyle}
            type="submit"
            value="Log In"
            data-test="submit"
          >
            {" "}
            Log In{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
