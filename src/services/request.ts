import axios from 'axios';

const baseUrl = '/api';

export const request = axios.create({
  baseURL: baseUrl,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log(err);
  }
);

request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);
