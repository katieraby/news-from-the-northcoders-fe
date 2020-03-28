import React, { Component } from "react";
import * as api from "../API";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { IconContext } from "react-icons";
import styles from "./Votes.module.css";

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
      <div className={styles.container}>
        <IconContext.Provider value={{ color: "#06d6a0", size: "1.5em" }}>
          <FiArrowUp
            className={upvoteClicked && "disabled"}
            onClick={() => {
              if (upvoteClicked) {
                return;
              }
              this.upvoteRequest(this.props.id, 1);
              this.setState({ upvoteClicked: true });
            }}
          />
          <p className={styles.p}>{this.props.votes + votesDifference}</p>
          <FiArrowDown
            className={downvoteClicked && "disabled"}
            onClick={() => {
              if (downvoteClicked) {
                return;
              }
              this.upvoteRequest(this.props.id, -1);
              this.setState({ downvoteClicked: true });
            }}
          />
        </IconContext.Provider>
        {voteErr !== null && <p>'Error voting'</p>}
      </div>
    );
  }

  upvoteRequest = (id, difference) => {
    if (this.props.article === true) {
      api.patchArticleVote(id, difference).catch(err => {
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
      api.patchCommentVote(id, difference).catch(err => {
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
