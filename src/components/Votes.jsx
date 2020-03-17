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
      api
        .patchArticleVote(id)
        .then(({ data }) => {
          console.log(data);
          //   getting data back successfully in log
        })
        .catch(console.dir);
    }

    if (this.props.comment) {
      api
        .patchCommentVote(id)
        .then(({ data }) => {
          console.log(data);
        })
        .catch(console.dir);
    }
  };
}

export default Votes;
