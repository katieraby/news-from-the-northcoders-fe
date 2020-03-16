import React from "react";
import styles from "./ArticleCard.module.css";

const ArticleCard = ({
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
      <h3>{title}</h3>
      <p>{body}</p>
      <p>
        Posted {created_at} in topic {topic} by user {author}
      </p>
    </div>
  );
};

export default ArticleCard;
