// takes logged in user and comment body text, logged in user is on props
// need to send article id and objtopost

import React, { Component } from "react";
import styles from "./PostComment.module.css";

class PostComment extends Component {
  state = {
    username: "",
    body: ""
  };

  render() {
    const { loggedInUser } = this.props;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label>
          <p>Logged in as {loggedInUser}. Post your comment below.</p>
          <input
            value={this.state.body}
            onChange={this.handleInput}
            className={styles.inputText}
            type="textarea"
            placeholder="Write your comment here..."
          ></input>
        </label>
        <button className={styles.button}>Post</button>
      </form>
    );
  }

  handleInput = event => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };
}

export default PostComment;
