import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ou outra forma de armazenamento de token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  
);

export const setupInterceptors = (removeToken: any) => {
  api.interceptors.response.use(
    (response) => {
      // Manipula a resposta de sucesso
      return response;
    },
    (error) => {
      console.log(error)
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        removeToken();
      }
      return Promise.reject(error);
    }
  );
};

export default api;
