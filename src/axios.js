import axios from 'axios';

// 創建 axios 實例
const instance = axios.create({
    baseURL:'https://localhost:7243/',
    timeout: 10000,
})

// 設置請求攔截器
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token); // 使用 jwt-decode 庫解碼 token
        console.log(decodedToken);
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;   
        }
        return config;
    },
    error => Promise.reject(error)
)

// 設置響應攔截器
instance.interceptors.response.use(
    response => response,
    error => {
        if(error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export default instance;