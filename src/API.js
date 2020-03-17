import axios from "axios";

const API = axios.create({
  baseURL: "https://news-from-the-northcoders-api.herokuapp.com/api"
});

export const fetchAllArticles = (topic, sort_by) => {
  return API.get("/articles", {
    params: {
      topic,
      sort_by
    }
  });
};

const votesBody = { inc_votes: 1 };
export const patchArticleVote = id => {
  return API.patch(`/articles/${id}`, votesBody);
};

export const patchCommentVote = id => {
  return API.patch(`/comments/${id}`, votesBody);
};
