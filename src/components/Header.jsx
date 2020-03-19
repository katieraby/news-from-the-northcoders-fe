import React from "react";
import styles from "./Header.module.css";

const Header = props => {
  return (
    <header>
      <h1>News from the Northcoders</h1>

      {props.loggedInUser !== null ? (
        <p className={styles.headerP}>Logged in: {props.loggedInUser} </p>
      ) : null}

      <button onClick={props.toggleLoggedIn}>
        {props.loggedInUser === null ? "Log In" : "Log Out"}
      </button>
    </header>
  );
};

export default Header;
