import axios from "axios";

const API = axios.create({
  baseURL: "https://news-from-the-northcoders-api.herokuapp.com/api"
});

export const fetchAllArticles = (topic, sort_by, p) => {
  return API.get("/articles", {
    params: {
      p,
      topic,
      sort_by
    }
  });
};

export const fetchArticleById = id => {
  return API.get(`/articles/${id}`);
};

const votesBody = { inc_votes: 1 };
export const patchArticleVote = id => {
  return API.patch(`/articles/${id}`, votesBody);
};

export const patchCommentVote = id => {
  return API.patch(`/comments/${id}`, votesBody);
};

export const fetchCommentsByArticleId = id => {
  return API.get(`/articles/${id}/comments`);
};

export const deleteComment = id => {
  return API.delete(`/comments/${id}`);
};

export const postComment = (objToPost, articleId) => {
  return API.post(`/articles/${articleId}/comments`, objToPost);
};

export const fetchAllTopics = () => {
  return API.get("/topics");
};
