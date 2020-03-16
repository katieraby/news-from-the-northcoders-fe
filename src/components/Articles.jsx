import React, { Component } from "react";
import ArticleList from "./ArticleList";
import * as api from "../API";

class Articles extends Component {
  state = {
    articleData: [
      {
        article_id: 33,
        title: "Seafood substitutions are increasing",
        body:
          "'SEAFOOD fraud is a serious global problem', begins a recent report from Oceana, an NGO. Reviewin...",
        votes: 0,
        topic: "cooking",
        author: "weegembump",
        created_at: "2018-05-30T15:59:13.341Z",
        comment_count: "6"
      },
      {
        article_id: 28,
        title: "High Altitude Cooking",
        body:
          "Most backpacking trails vary only a few thousand feet elevation. However, many trails can be foun...",
        votes: 0,
        topic: "cooking",
        author: "happyamy2016",
        created_at: "2018-05-27T03:32:28.514Z",
        comment_count: "5"
      },
      {
        article_id: 30,
        title:
          "Twice-Baked Butternut Squash Is the Thanksgiving Side Dish of Your Dreams",
        body:
          "What if, for once, your Thanksgiving sides were just as dazzling as the centerpiece turkey? Imagi...",
        votes: 0,
        topic: "cooking",
        author: "jessjelly",
        created_at: "2018-05-06T02:40:35.489Z",
        comment_count: "8"
      }
    ],
    isLoaded: false
  };
  render() {
    const { articleData, articlesByTopic, isLoaded } = this.state;
    return (
      <div>
        <h2>
          {!this.props.topic ? "hello from all articles" : "hello from "}
          {this.props.topic}
        </h2>
        {isLoaded && <ArticleList articleData={articleData} />}
      </div>
    );
  }

  fetchAllArticles = () => {
    api
      .fetchAllArticles(this.props.topic)
      .then(({ data }) => this.setState({ articleData: data }));
  };

  componentDidMount() {
    this.fetchAllArticles();
  }
}

export default Articles;
