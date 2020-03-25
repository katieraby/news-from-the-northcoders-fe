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
      article_id: 0,
      title: "",
      body: "",
      votes: 0,
      topic: "",
      author: "",
      created_at: "",
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
        created_at,
        comment_count
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
                  comment_count={comment_count}
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
