import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || 'http://localhost:5000',
});

// 添加请求拦截器，处理错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('Network Error: Unable to connect to the server');
    }
    return Promise.reject(error);
  }
);

export default api;