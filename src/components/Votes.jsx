import React, { Component } from "react";
import * as api from "../API";

class Votes extends Component {
  state = {
    votesToIncrease: 0
  };
  render() {
    return (
      <div>
        <h4>votes: {this.props.votes + this.state.votesToIncrease}</h4>
        <button
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
      api.patchArticleVote(id);
      this.setState(prevState => {
        return { votesToIncrease: prevState.votesToIncrease + 1 };
      });
    }

    if (this.props.comment) {
      api.patchCommentVote(id);
      this.setState(prevState => {
        return { votesToIncrease: prevState.votesToIncrease + 1 };
      });
    }
  };
}

export default Votes;
