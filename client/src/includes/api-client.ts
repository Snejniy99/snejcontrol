import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});


export default axios