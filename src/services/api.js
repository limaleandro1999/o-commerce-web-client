import axios from 'axios';

const api = axios.create({
    baseURL: 'https://o-commerce-web-server.herokuapp.com/'//'http://localhost:3000'
});

export default api;
