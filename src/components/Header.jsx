import React from "react";
import styles from "./Header.module.css";

const Header = props => {
  return (
    <header>
      <h1>News from the Northcoders</h1>
      <p className={styles.headerP}>Logged in: {props.loggedInUser}</p>
    </header>
  );
};

export default Header;
