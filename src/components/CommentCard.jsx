import React from "react";
import styles from "./CommentCard.module.css";
import Votes from "./Votes";

const CommentCard = ({ author, created_at, body, votes, comment_id }) => {
  return (
    <div>
      <p className={styles.commentHeader}>
        Posted by {author} on {created_at}
      </p>
      <p className={styles.commentBody}>{body}</p>
      <Votes votes={votes} id={comment_id} comment={true} />
    </div>
  );
};

export default CommentCard;
