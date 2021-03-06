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
            required
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
    this.setState({
      body: event.target.value,
      username: this.props.loggedInUser
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handlePostComment(this.state);
    this.setState({ username: "", body: "" });
  };
}

export default PostComment;
