import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsb-ecommerce-app.herokuapp.com/api/v1',
});

export default api;
