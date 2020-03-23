import React, { Component } from "react";
import "./App.module.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Articles from "./components/Articles";
import ArticleById from "./components/ArticleById";
import ErrorHandling from "./components/ErrorHandling";

class App extends Component {
  state = { loggedInUser: null };
  render() {
    const { loggedInUser } = this.state;
    return (
      <div>
        <Header
          toggleLoggedIn={this.toggleLoggedIn}
          loggedInUser={loggedInUser}
        />
        <Nav />
        <Router primary={false}>
          <Articles path="/" />
          <Articles path="/topics/:topic" />
          <Articles path="/:author/articles" />
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
}

export default App;
