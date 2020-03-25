import React from "react";
import ArticleCard from "./ArticleCard";
import styles from "./ArticleList.module.css";

const ArticleList = props => {
  return (
    <main className={styles.listContainer}>
      {props.articleData.map(article => {
        return (
          <ArticleCard
            {...article}
            key={article.article_id}
            loggedInUser={props.loggedInUser}
            handleDelete={props.handleDelete}
          />
        );
      })}
    </main>
  );
};

export default ArticleList;
