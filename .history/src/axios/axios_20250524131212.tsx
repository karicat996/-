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
    },
    error => Promise.reject(error) 
  );



//响应拦截器
apiClient.interceptors.response.use( 
    response => response,
    error => {
      if (error.response?.status  === 401) {
        // 自动处理未授权错误
        localStorage.removeItem('authToken'); 
        window.location.href  = '/login';
      }
      return Promise.reject(error); 
    }
  );
  
  // 定义注册接口
  export const registerUser = async (payload: { username: string; password: string }) => {
    try {
      const response = await apiClient.post('/register',  payload);
      toast.success(' 注册成功！', { autoClose: 3000 });
      return response.data; 
    } catch (error: any) {
        const message = error.response?.data?.message  || '网络异常';
        toast.error(message,  { autoClose: 5000 });
        throw new Error(message);
    }
  };
