import React, { Component } from "react";
import axios from "axios";

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

class Move extends Component {
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Move;
