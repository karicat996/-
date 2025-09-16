import axios from 'axios';
import {toast} from 'react-toastify';


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout:15000,
    headers:{
        'Content-Type':'application/json',
        'X-Requested-With':'XMLHttpRequest'
    }
});

//请求拦截器
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken'); 
    if (token) config.headers.Authorization  = `Bearer ${token}`;
    return config;
},error => Promise.reject(error));



//响应拦截器
apiClient.interceptors.response.use(
    reponse => reponse,
    error => {
        if(error.response?.status === 401){
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);



