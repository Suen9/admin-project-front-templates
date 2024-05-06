import request from './index.js'

// 封装 GET 请求
const get = (url, params) => {
    return new Promise((resolve, reject) => {
        request.get(url, {params: params})
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// 封装 POST 请求
const post = (url, data) => {
    return new Promise((resolve, reject) => {
        request.post(url, data)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const put = (url, data) => {
    return new Promise((resolve, reject) => {
        request.put(url, data)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const del = (url, data) => {
    return new Promise((resolve, reject) => {
        request.delete(url, data)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export {
    get,
    post,
    put,
    del
}