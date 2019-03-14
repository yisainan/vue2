import axios from 'axios'
import store from '../../store'
const server = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/v1' : '/api/v1',
    timeout: 2000,  // 超时
})

server.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
// http response 拦截器
server.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            
            switch (error.response.status) {
                case 401:
                    store.dispatch('clearToken') // 清除token
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

export default server