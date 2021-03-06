import React, { Component } from "react";
import ArticleList from "./ArticleList";
import * as api from "../API";
import styles from "./Articles.module.css";
import SortBar from "./SortBar";
import Loading from "./Loading";
import ErrorHandling from "./ErrorHandling";
import PostArticle from "./PostArticle";

class Articles extends Component {
  state = {
    articleData: [],
    isLoaded: false,
    sortBy: null,
    page: 1,
    totalCount: 1,
    err: null,
    topicData: []
  };

  render() {
    const {
      articleData,
      isLoaded,
      totalCount,
      page,
      err,
      topicData
    } = this.state;
    const { loggedInUser, newTopicToNav } = this.props;
    return (
      <div className={styles.articles}>
        {this.props.topic ? (
          <h2 className={styles.h2}>{this.props.topic}</h2>
        ) : null}
        {this.props.author ? (
          <h2 className={styles.h2}>articles by {this.props.author}</h2>
        ) : null}
        {!this.props.topic && !this.props.author ? (
          <h2 className={styles.h2}>all articles</h2>
        ) : null}
        <SortBar handleSort={this.handleSort} />

        {err === null ? null : (
          <ErrorHandling msg={err.data.msg} status={err.status} />
        )}

        {loggedInUser !== null && (
          <PostArticle
            newTopicToNav={newTopicToNav}
            loggedInUser={loggedInUser}
            postAnArticle={this.postAnArticle}
            topicData={topicData}
            newTopicAdded={this.newTopicAdded}
          />
        )}

        {isLoaded ? (
          <>
            <ArticleList
              handleDelete={this.handleDelete}
              articleData={articleData}
              loggedInUser={loggedInUser}
            />
            <div className={styles.btnContainer}>
              <button
                className={styles.button}
                disabled={page === 1}
                onClick={() => {
                  this.changePage(-1);
                }}
              >
                Previous
              </button>
              <button
                className={styles.button}
                disabled={Math.ceil(totalCount / 10) <= page}
                onClick={() => {
                  this.changePage(1);
                }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    );
  }

  fetchAllArticles = () => {
    api
      .fetchAllArticles(
        this.props.topic,
        this.state.sortBy,
        this.state.page,
        this.props.author
      )
      .then(({ data }) =>
        this.setState({
          articleData: data.articles,
          totalCount: data.totalCount,
          isLoaded: true
        })
      )
      .catch(err => {
        this.setState({ err: err.response, isLoaded: true });
      });
  };

  handleDelete = articleId => {
    api.deleteArticle(articleId).then(() => {
      this.fetchAllArticles();
    });
  };

  handleSort = sortByQuery => {
    this.setState({ sortBy: sortByQuery, isLoaded: false });
  };

  postAnArticle = objToPost => {
    api
      .addAnArticle(objToPost)
      .then(() => {
        this.fetchAllArticles();
      })
      .catch(err => {
        this.setState({ err: err.response, isLoaded: true });
      });
  };

  fetchTopics = () => {
    api
      .fetchAllTopics()
      .then(({ data }) => {
        this.setState({ topicData: data.topics });
      })
      .catch(err => {
        this.setState({ err: err.response, isLoaded: true });
      });
  };

  newTopicAdded = () => {
    this.fetchTopics();
  };

  changePage = direction => {
    this.setState(currState => {
      return { page: currState.page + direction };
    });
  };

  componentDidMount() {
    this.fetchAllArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topic !== this.props.topic ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.page !== this.state.page
    ) {
      this.fetchAllArticles();
    }

    if (prevProps.loggedInUser !== this.props.loggedInUser) {
      this.fetchTopics();
    }
  }
}

export default Articles;
