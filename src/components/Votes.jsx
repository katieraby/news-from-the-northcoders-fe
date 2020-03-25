import React, { Component } from "react";
import * as api from "../API";

class Votes extends Component {
  state = {
    votesDifference: 0,
    voteErr: null,
    upvoteClicked: false,
    downvoteClicked: false
  };
  render() {
    const {
      votesDifference,
      voteErr,
      upvoteClicked,
      downvoteClicked
    } = this.state;

    return (
      <div>
        <h4>votes: {this.props.votes + votesDifference}</h4>
        {voteErr !== null && <p>'Error voting'</p>}
        <button
          disabled={upvoteClicked}
          onClick={() => {
            this.upvoteRequest(this.props.id, 1);
            this.setState({ upvoteClicked: true });
          }}
        >
          upvote
        </button>
        <button
          disabled={downvoteClicked}
          onClick={() => {
            this.upvoteRequest(this.props.id, -1);
            this.setState({ downvoteClicked: true });
          }}
        >
          downvote
        </button>
      </div>
    );
  }

  upvoteRequest = (id, difference) => {
    if (this.props.article === true) {
      api.patchArticleVote(id).catch(err => {
        this.setState(prevState => {
          return {
            votesDifference: prevState.votesDifference - 1,
            voteErr: err
          };
        });
      });
      this.setState(prevState => {
        return {
          votesDifference: prevState.votesDifference + difference,
          voteErr: null
        };
      });
    }

    if (this.props.comment === true) {
      api.patchCommentVote(id).catch(err => {
        this.setState(prevState => {
          return {
            votesDifference: prevState.votesDifference - 1,
            voteErr: err
          };
        });
      });
      this.setState(prevState => {
        return {
          votesDifference: prevState.votesDifference + difference,
          voteErr: null
        };
      });
    }
  };
}

export default Votes;
