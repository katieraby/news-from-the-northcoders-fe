import React, { Component } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Articles from "./components/Articles";
import ArticleById from "./components/ArticleById";
import ErrorHandling from "./components/ErrorHandling";

class App extends Component {
  state = { loggedInUser: "JessJelly" };
  render() {
    return (
      <div>
        <Header loggedInUser={this.state.loggedInUser} />
        <Nav />
        <Router primary={false}>
          <Articles path="/" />
          <Articles path="/topics/:topic" />
          <ArticleById
            path="/articles/:article_id"
            loggedInUser={this.state.loggedInUser}
          />
          <ErrorHandling default />
        </Router>
      </div>
    );
  }
}

export default App;
