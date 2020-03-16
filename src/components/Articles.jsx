import React, { Component } from "react";
import ArticleList from "./ArticleList";
import * as api from "../API";
import styles from "./Articles.module.css";
import SortBar from "./SortBar";

class Articles extends Component {
  state = {
    articleData: [],
    isLoaded: false,
    sortBy: ""
  };

  render() {
    const { articleData, isLoaded } = this.state;
    return (
      <div>
        <h2 className={styles.h2}>
          {!this.props.topic ? "all articles" : this.props.topic}
        </h2>
        <SortBar handleSort={this.handleSort} />
        {isLoaded ? <ArticleList articleData={articleData} /> : "loading..."}
      </div>
    );
  }

  fetchAllArticles = () => {
    api
      .fetchAllArticles(this.props.topic, this.state.sortBy)
      .then(({ data }) =>
        this.setState({ articleData: data.articles, isLoaded: true })
      )
      .catch(console.dir);
  };

  handleSort = sortQuery => {
    this.setState({ sortBy: sortQuery });
  };

  componentDidMount() {
    this.fetchAllArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.articleData !== this.state.articleData) {
      this.fetchAllArticles();
    }

    if (prevState.sortBy !== this.state.sortBy) {
      this.fetchAllArticles();
    }
  }
}

export default Articles;
