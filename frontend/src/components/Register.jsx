import React, { Component } from "react";
import axios from "axios";

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post(
        "https://lambda-mud-test.herokuapp.com/api/registration/",
        this.state
      )
      .then(res => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.key);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      username: "",
      password1: "",
      password2: ""
    });
  };

  render() {
    return (
      <div className="form-styles">
        <h1>Register</h1>
        <p>To sign up, please enter a user name and password</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            {/* <label>User Name</label> */}
            <input
              type="text"
              placeholder="Enter a User Name here"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            {/* <label>password1</label> */}
            <input
              type="password"
              placeholder="Enter password1 here"
              name="password1"
              value={this.state.password1}
              onChange={this.handleChange}
            />
          </div>
          <div>
            {/* <label>password1</label> */}
            <input
              type="password"
              placeholder="Retype Password Here"
              name="password2"
              value={this.state.password2}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <button>Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegistrationPage;
