import axios from "axios";

export default axios.create({
  // development
  baseURL: process.env.NODE_ENV === "production"?"https://linkedinclone577.herokuapp.com":"http://localhost:5000",
  withCredentials: true,
});