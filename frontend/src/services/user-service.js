import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8072/FoodiFy/auth";


const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserInfo = () => {
    return axios.get("http://localhost:8072/FoodiFy/auth/userinfo", { headers: authHeader() });
};



const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "prem", { headers: authHeader() });
};
const getResputrantBoard = () => {
    return axios.get(API_URL + "resturant", { headers: authHeader() });
  };
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
  getResputrantBoard,
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getUserInfo
};

export default UserService;
