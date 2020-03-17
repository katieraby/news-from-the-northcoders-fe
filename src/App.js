import React, { Component } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Articles from "./components/Articles";

class App extends Component {
  state = { loggedInUser: "JessJelly" };
  render() {
    return (
      <div>
        <Header loggedInUser={this.state.loggedInUser} />
        <Nav />
        <Router primary={false}>
          <Articles path="/">{/* <h2>Children Test</h2> */}</Articles>
          <Articles path="/articles/:topic">
            {/* <h2>Children Test 2 - Topics</h2> */}
          </Articles>
        </Router>
      </div>
    );
  }
}

export default App;
