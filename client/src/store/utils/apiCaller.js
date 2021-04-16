import axios from 'axios';

export default function apiCaller(method, route, data = null) {
  const config = {
    method,
    url: process.env.REACT_APP_API_URL + route,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: data !== null ? JSON.stringify(data) : null,
  };
  return axios(config)
    .then(response => response.data)
    .catch(error => error);
}
