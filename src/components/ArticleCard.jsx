import React from "react";
import styles from "./ArticleCard.module.css";
import { Link } from "@reach/router";
import Votes from "./Votes";
import moment from "moment";

const ArticleCard = ({
  article_id,
  title,
  body,
  votes,
  topic,
  author,
  created_at,
  loggedInUser,
  handleDelete
}) => {
  return (
    <div className={styles.articlesCard}>
      <h3>
        <Link className={styles.aTitle} to={`/articles/${article_id}`}>
          {title}
        </Link>
        {loggedInUser === author ? (
          <button
            onClick={() => {
              handleDelete(article_id);
            }}
          >
            Delete Article
          </button>
        ) : null}
      </h3>
      <p>{body}</p>
      <p>
        Posted {moment(created_at).format("LLL")} in topic{" "}
        <Link className={styles.aTopic} to={`/topics/${topic}`}>
          {topic}
        </Link>{" "}
        by user{" "}
        <Link className={styles.aTopic} to={`/${author}/articles`}>
          {author}
        </Link>
      </p>
      <Votes votes={votes} id={article_id} article={true} />
    </div>
  );
};

export default ArticleCard;
