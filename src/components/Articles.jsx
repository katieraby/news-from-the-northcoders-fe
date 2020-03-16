import React, { Component } from "react";
import ArticleList from "./ArticleList";
import * as api from "../API";
import styles from "./Articles.module.css";

class Articles extends Component {
  state = {
    articleData: [],
    isLoaded: false
  };
  render() {
    const { articleData, isLoaded } = this.state;
    return (
      <div>
        <h2 className={styles.h2}>
          {!this.props.topic ? "all articles" : this.props.topic}
        </h2>
        {isLoaded ? <ArticleList articleData={articleData} /> : "loading..."}
      </div>
    );
  }

  fetchAllArticles = () => {
    api
      .fetchAllArticles(this.props.topic)
      .then(({ data }) =>
        this.setState({ articleData: data.articles, isLoaded: true })
      )
      .catch(console.dir);
  };

  componentDidMount() {
    this.fetchAllArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.articleData !== this.state.articleData) {
      this.fetchAllArticles();
    }
  }
}

export default Articles;
