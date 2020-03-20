import React, { Component } from "react";
import ArticleList from "./ArticleList";
import * as api from "../API";
import styles from "./Articles.module.css";
import SortBar from "./SortBar";
import Loading from "./Loading";

class Articles extends Component {
  state = {
    articleData: [],
    isLoaded: false,
    sortBy: null,
    page: 1,
    totalCount: 1
  };

  render() {
    const { articleData, isLoaded, totalCount, page } = this.state;
    return (
      <div className={styles.articles}>
        <h2 className={styles.h2}>
          {!this.props.topic ? "all articles" : this.props.topic}
        </h2>
        <SortBar handleSort={this.handleSort} />
        {isLoaded ? (
          <>
            <ArticleList articleData={articleData} />

            <button
              disabled={page === 1}
              onClick={() => {
                this.changePage(-1);
              }}
            >
              Previous
            </button>
            <button
              disabled={Math.ceil(totalCount / 10) <= page}
              onClick={() => {
                this.changePage(1);
              }}
            >
              Next
            </button>
          </>
        ) : (
          <Loading />
        )}
      </div>
    );
  }

  fetchAllArticles = () => {
    api
      .fetchAllArticles(this.props.topic, this.state.sortBy, this.state.page)
      .then(({ data }) =>
        this.setState({
          articleData: data.articles,
          totalCount: data.totalCount,
          isLoaded: true
        })
      )
      .catch(console.dir);
  };

  changePage = direction => {
    this.setState(currState => {
      return { page: currState.page + direction };
    });
  };

  handleSort = sortByQuery => {
    this.setState({ sortBy: sortByQuery, isLoaded: false });
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
  }
}

export default Articles;
