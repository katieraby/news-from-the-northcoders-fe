import React, { Component } from "react";
import * as api from "../API";
import ErrorHandling from "./ErrorHandling";
import styles from "./ArticleById.module.css";
import { Link } from "@reach/router";
import Votes from "./Votes";
import CommentList from "./CommentList";
import Loading from "./Loading";
import moment from "moment";

class ArticleById extends Component {
  state = {
    articleById: {
      article_id: 8,
      title: "Express.js: A Server-Side JavaScript Framework",
      body:
        "You’re probably aware that JavaScript is the programming language most often used to add interactivity to the front end of a website, but its capabilities go far beyond that—entire sites can be built on JavaScript, extending it from the front to the back end, seamlessly. Express.js and Node.js gave JavaScript newfound back-end functionality—allowing developers to build software with JavaScript on the server side for the first time. Together, they make it possible to build an entire site with JavaScript: You can develop server-side applications with Node.js and then publish those Node.js apps as websites with Express. Because Node.js itself wasn’t intended to build websites, the Express framework is able to layer in built-in structure and functions needed to actually build a site. It’s a pretty lightweight framework that’s great for giving developers extra, built-in web application features and the Express API without overriding the already robust, feature-packed Node.js platform. In short, Express and Node are changing the way developers build websites.",
      votes: 0,
      topic: "coding",
      author: "cooljmessy",
      created_at: "2016-06-30T06:59:39.654Z",
      comment_count: "7"
    },
    err: null,
    isLoaded: false
  };

  render() {
    const {
      articleById: {
        article_id,
        title,
        body,
        votes,
        topic,
        author,
        created_at
      },
      isLoaded
    } = this.state;

    if (this.state.err) return <ErrorHandling />;

    return (
      <>
        {isLoaded ? (
          <>
            <h2>{topic}</h2>
            <div className={styles.articleContainer}>
              <main className={styles.article}>
                <h3>{title}</h3>
                <p>
                  Posted in <Link to={`/topics/${topic}`}>{topic}</Link> on{" "}
                  {moment(created_at).format("LLL")} by {author}
                </p>
                <p>{body}</p>
                <Votes votes={votes} id={article_id} article={true} />
                <CommentList
                  article_id={article_id}
                  loggedInUser={this.props.loggedInUser}
                />
              </main>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  }

  fetchArticleData = id => {
    api
      .fetchArticleById(id)
      .then(({ data }) => {
        this.setState({ articleById: data.article, isLoaded: true });
      })
      .catch(err => {
        this.setState({ err });
      });
  };

  componentDidMount() {
    this.fetchArticleData(this.props.article_id);
  }
}

export default ArticleById;
