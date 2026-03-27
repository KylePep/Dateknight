import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // your Laravel backend
  withCredentials: true,            // send cookies on every request
  xsrfCookieName: 'XSRF-TOKEN',     // Laravel CSRF cookie
  xsrfHeaderName: 'X-XSRF-TOKEN',   // header Laravel expects
});

export default api;
