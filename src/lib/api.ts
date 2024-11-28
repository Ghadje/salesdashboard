import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://10.119.26.100:3006';


export const api = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    (config) => {
        if (config.url !== 'api/user/login') {
            const token = Cookies.get('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);