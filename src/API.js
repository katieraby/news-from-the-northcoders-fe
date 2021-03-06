import axios from "axios";

const API = axios.create({
  baseURL: "https://news-from-the-northcoders-api.herokuapp.com/api"
});

export const fetchAllArticles = (topic, sort_by, p, author) => {
  return API.get("/articles", {
    params: {
      p,
      topic,
      sort_by,
      author
    }
  });
};

export const fetchArticleById = id => {
  return API.get(`/articles/${id}`);
};

export const patchArticleVote = (id, inc) => {
  const votesBody = { inc_votes: inc };
  return API.patch(`/articles/${id}`, votesBody);
};

export const patchCommentVote = (id, inc) => {
  const votesBody = { inc_votes: inc };
  return API.patch(`/comments/${id}`, votesBody);
};

export const fetchCommentsByArticleId = (id, p) => {
  return API.get(`/articles/${id}/comments`, {
    params: {
      p
    }
  });
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

export const deleteArticle = id => {
  return API.delete(`/articles/${id}`);
};

export const addAnArticle = objToPost => {
  return API.post("/articles", objToPost);
};
