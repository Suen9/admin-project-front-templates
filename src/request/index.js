import axios from 'axios';
import { getAccessToken } from '../utils/tokenUtil.js';
import Vrouter from "@/router";
const route = Vrouter.currentRoute.value;

const request = axios.create({
    baseURL: "http://localhost:8090",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }
});

const isNotAllowedRoute = () => {
    const allowedRoutes = ['register', 'reset']; // 不能可以访问的路由列表
    return !allowedRoutes.includes(route.name);
}

request.interceptors.request.use(
    config => {
        if (getAccessToken() && isNotAllowedRoute()) {
            config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 200) {
            console.log('请求错误', res.message);
            return res;
        } else {
            return res;
        }
    },
    error => {
        console.log('接口信息报错' + error);
        return Promise.reject(error);
    }
);

export default request;
