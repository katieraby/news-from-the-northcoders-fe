import React, { Component } from "react";
import styles from "./PostArticle.module.css";

class PostArticle extends Component {
  /*username is going to be loggedinUser*/
  state = { username: "", title: "", topic: "", body: "" };
  render() {
    return (
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <h3>Write a new article</h3>
          <label>
            <span className={styles.title}>Title:</span>
            <input
              type="text"
              name="title"
              className={styles.titlearea}
              placeholder="Title of the article here"
              onChange={this.handleInput}
            ></input>
          </label>
          <label>
            <span className={styles.topic}>Topic:</span>
            <input
              type="text"
              name="topic"
              placeholder="Topic of the article here"
              className={styles.topicarea}
              onChange={this.handleInput}
            ></input>
          </label>
          <label>
            <span className={styles.content}>Content:</span>
            <textarea
              className={styles.contentArea}
              name="body"
              rows="10"
              placeholder="Write your article content in here..."
              onChange={this.handleInput}
            ></textarea>
          </label>
          <button>Post article</button>
        </form>
      </div>
    );
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ username: this.props.loggedInUser });
  };
}

export default PostArticle;
