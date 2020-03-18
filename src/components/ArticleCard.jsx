import React from "react";
import styles from "./ArticleCard.module.css";
import { Link } from "@reach/router";
import Votes from "./Votes";

const ArticleCard = ({
  article_id,
  title,
  body,
  votes,
  topic,
  author,
  created_at,
  comment_count
}) => {
  return (
    <div className={styles.articlesCard}>
      <h3>
        <Link to={`/articles/${article_id}`}>{title}</Link>
      </h3>
      <p>{body}</p>
      <p>
        Posted {created_at} in topic{" "}
        <Link to={`/topics/${topic}`}>{topic}</Link> by user {author}
      </p>
      <Votes votes={votes} id={article_id} article={true} />
    </div>
  );
};

export default ArticleCard;
