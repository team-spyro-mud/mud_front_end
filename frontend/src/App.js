import React, { Component } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";
import axios from "axios";

const logoutStyle = {
  width: "10%",
  border: "1px solid black",
  fontSize: "20px",
  backgroundColor: "maroon"
};

const moveButtonN = {
  width: "10%",
  border: "1px solid black",
  fontSize: "20px",
  backgroundColor: "yellow"
};

const moveButtonS = {
  width: "10%",
  border: "1px solid black",
  fontSize: "20px",
  backgroundColor: "blue"
};

const moveButtonE = {
  width: "10%",
  border: "1px solid black",
  fontSize: "20px",
  backgroundColor: "peach"
};

const moveButtonW = {
  width: "10%",
  border: "1px solid black",
  fontSize: "20px",
  backgroundColor: "yellow"
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

  moveDirection = move => {
    let direction;
    let go = { direction: move };
    console.log(go);
    axios
      .post("https://lambda-mud-test.herokuapp.com/api/adv/move/", go, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(res);
        window.location.reload();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 0);
      })
      .catch(err => {
        console.log(err);
      });
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
            <h1>Weclome {this.state.initData.name}!</h1>
          ) : null}
          <h3>{this.state.initData.title}</h3>
          <h4>{this.state.initData.description}</h4>
          <button onClick={() => this.moveDirection("n")} style={moveButtonN}>
            Move North
          </button>
          <button onClick={() => this.moveDirection("s")} style={moveButtonS}>
            Move South
          </button>
          <button onClick={() => this.moveDirection("e")} style={moveButtonE}>
            Move East
          </button>
          <button onClick={() => this.moveDirection("w")} style={moveButtonW}>
            Move W
          </button>
          {/* <h5>{this.state.roomData.rooms}</h5> */}
        </div>
      </>
    );
  }
}

export default App;
