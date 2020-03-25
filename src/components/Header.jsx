import React from "react";
import styles from "./Header.module.css";
import { Link } from "@reach/router";

const Header = props => {
  return (
    <header>
      <h1>News from the Northcoders</h1>

      {props.loggedInUser !== null ? (
        <p className={styles.headerP}>
          Logged in:{" "}
          <Link
            className={styles.loggedInUser}
            to={`/${props.loggedInUser}/articles`}
          >
            {props.loggedInUser}
          </Link>{" "}
        </p>
      ) : null}

      <button className={styles.button} onClick={props.toggleLoggedIn}>
        {props.loggedInUser === null ? "Log In" : "Log Out"}
      </button>
    </header>
  );
};

export default Header;
