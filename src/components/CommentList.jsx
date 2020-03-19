import React, { Component } from "react";
import PostComment from "./PostComment";
import styles from "./CommentList.module.css";
import CommentCard from "./CommentCard";
import * as api from "../API";

class CommentList extends Component {
  state = {
    commentData: [],
    isLoaded: false
  };

  render() {
    const { commentData, isLoaded } = this.state;
    const { loggedInUser } = this.props;
    return (
      <main className={styles.listContainer}>
        <h3>Comments</h3>
        {isLoaded ? (
          <>
            <p>{commentData.length} comments</p>
            {loggedInUser !== null ? (
              <PostComment
                loggedInUser={loggedInUser}
                handlePostComment={this.handlePostComment}
              />
            ) : null}
            {commentData.map(comment => {
              return (
                <CommentCard
                  {...comment}
                  key={comment.comment_id}
                  loggedInUser={loggedInUser}
                  handleDelete={this.handleDelete}
                />
              );
            })}
          </>
        ) : (
          <p>Loading comments...</p>
        )}
      </main>
    );
  }

  handlePostComment = objToPost => {
    api.postComment(objToPost, this.props.article_id).then(({ data }) => {
      this.setState(prevState => {
        return { commentData: [data.comment, ...prevState.commentData] };
      });
    });
  };

  handleDelete = id => {
    api.deleteComment(id).then(() => {
      this.fetchCommentsByArticleId();
    });
  };

  fetchCommentsByArticleId = () => {
    api.fetchCommentsByArticleId(this.props.article_id).then(({ data }) => {
      this.setState({ commentData: data.comments, isLoaded: true });
    });
  };

  componentDidMount() {
    this.fetchCommentsByArticleId();
  }
}

export default CommentList;
