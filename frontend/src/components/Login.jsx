import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
      // error: ''
    };
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: "" });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("https://lambda-mud-test.herokuapp.com/api/login/", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
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
          <label>User Name:</label>
          <input
            type="text"
            data-test="username"
            value={this.state.username}
            onChange={this.handleUserChange}
          />
          <label className="password-login">Password:</label>
          <input
            type="password"
            data-test="password"
            value={this.state.password}
            onChange={this.handlePassChange}
          />
          <button type="submit" value="Log In" data-test="submit">
            {" "}
            Log In{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
