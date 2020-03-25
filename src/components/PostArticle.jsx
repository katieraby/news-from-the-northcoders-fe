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
              className={styles.titlearea}
              placeholder="Title of the article here"
            ></input>
          </label>
          <label className={styles.topic}>
            Topic:{" "}
            <input
              type="text"
              placeholder="Topic of the article here"
              className={styles.topicarea}
            ></input>
          </label>
          <label className={styles.content}>
            Content:
            <textarea
              className={styles.contentArea}
              rows="10"
              placeholder="Write your article content in here..."
            ></textarea>
          </label>
          <button>Post article</button>
        </form>
      </div>
    );
  }
}

export default PostArticle;
