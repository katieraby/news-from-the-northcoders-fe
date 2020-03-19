import React, { Component } from "react";
import styles from "./Nav.module.css";
import { Link } from "@reach/router";
import * as api from "../API";
import Loading from "../components/Loading";
import ErrorHandling from "../components/ErrorHandling";

class Nav extends Component {
  state = {
    topics: [],
    isLoaded: false,
    err: null
  };
  render() {
    const { topics, isLoaded, err } = this.state;
    return (
      <nav>
        <ul>
          <li className={styles.li}>
            <Link className={styles.navA} to="/">
              all
            </Link>
          </li>
          {err !== null ? (
            <ErrorHandling status={err.status} msg={err.statusText} />
          ) : null}
          {isLoaded ? (
            <>
              {topics.map(topic => {
                return (
                  <li key={topic.slug} className={styles.li}>
                    <Link className={styles.navA} to={`/topics/${topic.slug}`}>
                      {topic.slug}
                    </Link>
                  </li>
                );
              })}
            </>
          ) : (
            <Loading height={10} width={30} />
          )}
        </ul>
      </nav>
    );
  }

  componentDidMount() {
    this.getAllTopics();
  }

  getAllTopics = () => {
    api
      .fetchAllTopics()
      .then(({ data }) => {
        this.setState({ topics: data.topics, isLoaded: true });
      })
      .catch(err => {
        console.dir(err);
        this.setState({ err: err.response });
      });
  };
}

export default Nav;
