// Ce fichier permet de gerer les requel axios de maniere personnalise, pas besoin de toutjours repeter les autorisation, ou rafraichir le token ou se deconnecter apres expiration etc...   C'est une version personnalise
// src/utils/axiosInstance.js
import axios from "axios";

// import { jwtDecode } from "jwt-decode";

// Crée une instance d'axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token avant chaque requête


//A de-commenter lorsqu'on veut ajouter des authentification
// axiosInstance.interceptors.request.use(async (config) => {
//   const accessToken = localStorage.getItem("access_token");

//   if (accessToken) {
//     const decoded = jwtDecode(accessToken);
//     const currentTime = Date.now() / 1000;

//     if (decoded.exp < currentTime) {
//       // Le token a expiré, tentons un refresh
//       try {
//         const refreshToken = localStorage.getItem("refresh_token");
//         const response = await axios.post("http://localhost:8000/api/v1/token/refresh/", {
//           refresh: refreshToken,
//         });

//         localStorage.setItem("access_token", response.data.access);
//         config.headers.Authorization = `Bearer ${response.data.access}`;
//       } catch (error) {
//         // Refresh token expiré ou invalide, déconnexion
//         localStorage.clear();
//         window.location.href = "/login";
//         return Promise.reject(error);
//       }
//     } else {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//   }

//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default axiosInstance;
