import React, { Component } from "react";

const worldBox = {
  border: "1px solid red",
  display: "flex",
  width: "90%",
  height: "75vh"
};

const mapDisplayAsBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100px",
  height: "100px",
  backgroundColor: "black",
  color: "green",
  margin: "10px"
};

class DisplayMap extends Component {
  constructor(props) {
    super(props);
  }
  // <h1>{room.fields.title}</h1>
  render() {
    return (
      <div style={worldBox}>
        {this.props.rooms.map(room => {
          return <div style={mapDisplayAsBox}>{room.fields.title}</div>;
        })}
      </div>
    );
  }
}

export default DisplayMap;
