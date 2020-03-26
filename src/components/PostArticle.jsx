import React, { Component } from "react";
import styles from "./PostArticle.module.css";

class PostArticle extends Component {
  state = { username: "", title: "", topic: "", body: "" };

  render() {
    const { title, topic, body } = this.state;

    return (
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h3>Write a new article</h3>
          <label>
            <span className={styles.title}>Title:</span>
            <input
              required
              type="text"
              name="title"
              value={title}
              className={styles.titlearea}
              placeholder="Title of the article here"
              onChange={this.handleInput}
            ></input>
          </label>
          <label>
            <span className={styles.topic}>Topic:</span>
            <input
              required
              type="text"
              name="topic"
              value={topic}
              placeholder="Topic of the article here"
              className={styles.topicarea}
              onChange={this.handleInput}
            ></input>
          </label>
          <label>
            <span className={styles.content}>Content:</span>
            <textarea
              required
              className={styles.contentArea}
              name="body"
              rows="10"
              value={body}
              placeholder="Write your article content in here..."
              onChange={this.handleInput}
            ></textarea>
          </label>
          <button className={styles.button}>Post article</button>
        </form>
      </div>
    );
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ username: this.props.loggedInUser });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.postAnArticle(this.state);
    this.setState({ body: "", topic: "", title: "" });
  };
}

export default PostArticle;
