import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'//'https://obra-cometa-227817.appspot.com'
});

export default api;