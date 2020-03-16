import React, { Component } from "react";
import styles from "./Nav.module.css";
import { Link } from "@reach/router";

class Nav extends Component {
  state = {
    topics: [
      { slug: "coding", description: "Code is love, code is life" },
      { slug: "football", description: "FOOTIE!" },
      {
        slug: "cooking",
        description: "Hey good looking, what you got cooking?"
      }
    ]
  };
  render() {
    const { topics } = this.state;
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">all</Link>
          </li>
          {topics.map(topic => {
            return (
              <li key={topic.slug}>
                <Link to={`/articles/${topic.slug}`}>{topic.slug}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Nav;
