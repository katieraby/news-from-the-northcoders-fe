import React from "react";
import styles from "./Loading.module.css";
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Loader type="ThreeDots" color="#ef476f" height={80} width={80} />
    </div>
  );
};

export default Loading;
