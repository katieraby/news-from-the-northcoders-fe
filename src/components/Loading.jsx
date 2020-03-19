import React from "react";
import styles from "./Loading.module.css";
import Loader from "react-loader-spinner";

const Loading = props => {
  return (
    <div className={styles.loading}>
      <Loader
        type="ThreeDots"
        color="#ef476f"
        height={props.height || 80}
        width={props.width || 80}
      />
    </div>
  );
};

export default Loading;
