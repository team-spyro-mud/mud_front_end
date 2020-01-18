import React, { Component } from "react";

class DisplayMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.rooms.map(room => {
          return <div>Hi</div>;
        })}
      </div>
    );
  }
}

export default DisplayMap;
