import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-backend-ahud.onrender.com"
});

export default API;