import React from "react";
import styles from "./DeleteComment.module.css";

const DeleteComment = props => {
  return (
    <div>
      <button
        className={styles.button}
        onClick={() => {
          props.handleDelete(props.id);
        }}
      >
        Delete Comment
      </button>
    </div>
  );
};

export default DeleteComment;
