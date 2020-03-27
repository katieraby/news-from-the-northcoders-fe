import React, { Component } from "react";
import "./App.module.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Articles from "./components/Articles";
import ArticleById from "./components/ArticleById";
import ErrorHandling from "./components/ErrorHandling";

class App extends Component {
  state = { loggedInUser: null, newTopic: false };
  render() {
    const { loggedInUser } = this.state;
    return (
      <div>
        <Header
          toggleLoggedIn={this.toggleLoggedIn}
          loggedInUser={loggedInUser}
        />
        <Nav newTopic={this.state.newTopic} />
        <Router primary={false}>
          <Articles
            path="/"
            loggedInUser={loggedInUser}
            newTopicToNav={this.newTopicToNav}
          />
          <Articles
            path="/topics/:topic"
            loggedInUser={loggedInUser}
            newTopicToNav={this.newTopicToNav}
          />
          <Articles
            path="/:author/articles"
            loggedInUser={loggedInUser}
            newTopicToNav={this.newTopicToNav}
          />
          <ArticleById
            path="/articles/:article_id"
            loggedInUser={loggedInUser}
          />
          <ErrorHandling status={404} msg={"Page Not Found"} default />
        </Router>
      </div>
    );
  }

  toggleLoggedIn = () => {
    this.setState(currState => {
      return currState.loggedInUser === "jessjelly"
        ? { loggedInUser: null }
        : { loggedInUser: "jessjelly" };
    });
  };

  newTopicToNav = () => {
    this.setState(currState => {
      return { newTopic: !currState.newTopic };
    });
  };
}

export default App;
