import React, { Component } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Move from "./components/Move";
import "./App.css";
import axios from "axios";

// styled components
const logoutStyle = {
  width: "10%",
  border: "1px solid black",
  fontSize: "20px",
  backgroundColor: "maroon"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initData: [],
      roomData: [],
      loggedIn: false
    };
  }

  componentDidMount() {
    // Get player information while making sure they are authorized
    axios
      .get("https://lambda-mud-test.herokuapp.com/api/adv/init", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        this.setState({ initData: res.data, loggedIn: true });
        // console.log(res);
      })
      .catch(err => console.log(err));

    // Get room information
    axios
      .get("http://lambda-mud-test.herokuapp.com/api/adv/rooms/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        this.setState({ roomData: res.data });
        console.log(res.data.rooms);
      })
      .catch(err => console.log(err));
  }

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ loggedIn: false });
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  render() {
    return (
      <>
        <div>
          <Register />
          <Login />
          <br />

          <button style={logoutStyle} onClick={this.logout}>
            Logout
          </button>
        </div>
        <div>
          {this.state.loggedIn ? (
            <>
              <h1>Weclome {this.state.initData.name}!</h1>
              <h3>{this.state.initData.title}</h3>
              <h4>{this.state.initData.description}</h4>
              <Move />
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default App;
