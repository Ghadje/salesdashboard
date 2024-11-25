import axios from 'axios';

const API_BASE_URL = 'http://10.119.26.100:3006';


export const api = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
    },
});
