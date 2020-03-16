import React, { Component } from "react";

class Articles extends Component {
  state = { articleData: [] };
  render() {
    return (
      <div>
        <h2>
          {!this.props.topic ? "hello from all articles" : "hello from "}
          {this.props.topic}
        </h2>
      </div>
    );
  }
}

export default Articles;
