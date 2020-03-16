import axios from "axios";

const API = axios.create({
  baseURL: "https://news-from-the-northcoders-api.herokuapp.com/api"
});

export const fetchAllArticles = topic => {
  return API.get("/articles", {
    params: {
      topic
    }
  });
};
