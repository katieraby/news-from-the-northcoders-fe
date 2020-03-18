import React, { Component } from "react";
import * as api from "../API";

class Votes extends Component {
  state = {
    votesDifference: 0,
    voteErr: null
  };
  render() {
    return (
      <div>
        <h4>votes: {this.props.votes + this.state.votesDifference}</h4>
        {this.state.voteErr !== null && <p>'Error voting'</p>}
        <button
          disabled={this.state.votesDifference !== 0}
          onClick={() => {
            this.upvoteRequest(this.props.id);
          }}
        >
          upvote
        </button>
      </div>
    );
  }

  upvoteRequest = id => {
    if (this.props.article) {
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
          votesDifference: prevState.votesDifference + 1,
          voteErr: null
        };
      });
    }

    if (this.props.comment) {
      api.patchCommentVote(id).catch(err => {
        this.setState(prevState => {
          return {
            votesDifference: prevState.votesDifference - 1,
            voteErr: err
          };
        });
        this.setState(prevState => {
          return {
            votesDifference: prevState.votesDifference + 1,
            voteErr: null
          };
        });
      });
    }
  };
}

export default Votes;
