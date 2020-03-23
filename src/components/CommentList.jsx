import React, { Component } from "react";
import PostComment from "./PostComment";
import styles from "./CommentList.module.css";
import CommentCard from "./CommentCard";
import * as api from "../API";
import ErrorHandling from "../components/ErrorHandling";
import Loading from "./Loading";

class CommentList extends Component {
  state = {
    commentData: [],
    isLoaded: false,
    err: null,
    page: 1
  };

  render() {
    const { commentData, isLoaded, err, page } = this.state;
    const { loggedInUser } = this.props;

    return (
      <main className={styles.listContainer}>
        <h3>Comments</h3>
        {err !== null ? (
          <ErrorHandling msg={err.msg} status={err.status} />
        ) : null}
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
            <div className={styles.btnContainer}>
              <button
                className={styles.button}
                disabled={page === 1}
                onClick={() => {
                  this.changePage(-1);
                }}
              >
                Prev
              </button>
              <button
                className={styles.button}
                disabled={commentData.length / 10 > page}
                onClick={() => {
                  this.changePage(1);
                }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </main>
    );
  }

  handlePostComment = objToPost => {
    api
      .postComment(objToPost, this.props.article_id)
      .then(({ data }) => {
        this.setState(prevState => {
          return { commentData: [data.comment, ...prevState.commentData] };
        });
      })
      .catch(err => {
        this.setState({ err });
      });
  };

  handleDelete = id => {
    api
      .deleteComment(id)
      .then(() => {
        this.fetchCommentsByArticleId();
      })
      .catch(err => {
        this.setState({ err });
      });
  };

  changePage = direction => {
    this.setState(currState => {
      return { page: currState.page + direction };
    });
  };

  fetchCommentsByArticleId = () => {
    api
      .fetchCommentsByArticleId(this.props.article_id, this.state.page)
      .then(({ data }) => {
        this.setState({ commentData: data.comments, isLoaded: true });
      })
      .catch(err => {
        this.setState({ err });
      });
  };

  componentDidMount() {
    this.fetchCommentsByArticleId();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchCommentsByArticleId();
    }
  }
}

export default CommentList;
