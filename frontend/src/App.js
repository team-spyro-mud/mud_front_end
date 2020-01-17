import React, { Component } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Register />
        {/* <Login /> */}
      </div>
    );
  }
}

export default App;
