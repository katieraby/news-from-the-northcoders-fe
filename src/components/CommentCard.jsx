import React, { Component } from "react";
import styles from "./CommentCard.module.css";
import Votes from "./Votes";
import DeleteComment from "./DeleteComment";
import moment from "moment";

class CommentCard extends Component {
  render() {
    const {
      author,
      created_at,
      body,
      votes,
      comment_id,
      loggedInUser
    } = this.props;

    return (
      <div>
        <p className={styles.commentHeader}>
          Posted by {author} on {moment(created_at).format("LLL")}
        </p>
        {loggedInUser === author ? (
          <DeleteComment
            id={comment_id}
            handleDelete={this.props.handleDelete}
          />
        ) : null}
        <p className={styles.commentBody}>{body}</p>
        <Votes votes={votes} id={comment_id} comment={true} />
      </div>
    );
  }
}

export default CommentCard;
