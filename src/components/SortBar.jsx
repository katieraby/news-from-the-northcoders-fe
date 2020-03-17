import React, { Component } from "react";
import styles from "./SortBar.module.css";

class SortBar extends Component {
  state = { sortBy: "" };
  render() {
    return (
      <div className={styles.sortBar}>
        <button
          className={styles.button}
          value="created_at"
          onClick={this.handleInput}
        >
          Newest
        </button>
        <button
          className={styles.button}
          value="votes"
          onClick={this.handleInput}
        >
          Most Popular
        </button>
        <button
          className={styles.button}
          value="comment_count"
          onClick={this.handleInput}
        >
          Hottest
        </button>
      </div>
    );
  }

  handleInput = event => {
    this.setState({ sortBy: event.target.value }, () => {
      this.props.handleSort(this.state.sortBy);
    });
  };
}

export default SortBar;
