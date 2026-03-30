import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 5000,
})

api.interceptors.response.use(
    (response) => response,
    (error) => {console.log("Error:", error.response?.data); return Promise.reject(error);}
)

export default api;