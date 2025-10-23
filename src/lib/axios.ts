import axios from 'axios';

const axiosAPI = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosAPI;