import axios from "axios";
const API_URL = "http://localhost:8072/FoodiFy/auth";



const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {

    const userdetails = {
        "userName" : username,
        "password" : password
    }
  
  return axios
    .post(API_URL + "/login", userdetails)
    .then((response) => {
      if (response.data) {
        localStorage.setItem("TOKEN", JSON.stringify(response.data));
      }
    });
    
};


const logout = () => {
  localStorage.removeItem("TOKEN");
};


const getCurrentUser = () => {
  //console.log(localStorage.getItem("TOKEN"));
  return JSON.parse(localStorage.getItem("TOKEN"));
};

const getCurrentUsername = () => {
  
};


const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUsername
};


export default AuthService;
