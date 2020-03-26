import React, { Component } from "react";
import styles from "./PostArticle.module.css";

class PostArticle extends Component {
  state = { username: "", title: "", topic: "", body: "", createNew: false };

  render() {
    const { title, topic, body, createNew } = this.state;
    console.log(topic);
    return (
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h3>Post a new article</h3>
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
            <select
              name="topic"
              className={styles.topicarea}
              onChange={this.handleInput}
            >
              <option selected disabled>
                Select an existing topic or create a new one...
              </option>
              {this.props.topicData.map(topic => {
                return <option key={topic.slug}>{topic.slug}</option>;
              })}
              <option value="createNew">Create a new topic...</option>
            </select>
          </label>
          {createNew && (
            <label>
              New topic:
              <input
                name="topic"
                type="text"
                className={styles.titlearea}
                onSelect={this.handleInput}
              ></input>
            </label>
          )}
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
    if (event.target.value !== "createNew") {
      this.setState({ [event.target.name]: event.target.value });
      this.setState({ username: this.props.loggedInUser });
    } else {
      this.handleNewTopic();
    }
  };

  handleNewTopic = event => {
    this.setState({ createNew: true });
    this.setState({ topic: "" });
  };

  handleSubmit = event => {
    const { username, body, topic, title } = this.state;
    event.preventDefault();
    this.props.postAnArticle({ username, body, topic, title });
    this.setState({ body: "", topic: "", title: "" });
  };
}

export default PostArticle;
