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
                <span className={styles.articleFlex}>
                  <h3 className={styles.title}>{title}</h3>
                  <p className={styles.details}>
                    Posted in <Link to={`/topics/${topic}`}>{topic}</Link> on{" "}
                    {moment(created_at).format("LLL")} by{" "}
                    <Link to={`/${author}/articles`}>{author}</Link>
                  </p>
                  <p className={styles.main}>{body}</p>
                </span>
                <span className={styles.vote}>
                  <Votes votes={votes} id={article_id} article={true} />
                </span>
                <span className={styles.comments}>
                  <CommentList
                    article_id={article_id}
                    comment_count={comment_count}
                    loggedInUser={this.props.loggedInUser}
                  />
                </span>
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
