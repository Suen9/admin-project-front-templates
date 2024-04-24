import {ElMessage} from "element-plus";

// 认证信息名称
const authItemName = "access_token";

// 获取访问令牌
const getAccessToken = () => {
    // 从本地存储或会话存储中获取认证信息字符串
    const str = localStorage.getItem(authItemName) || sessionStorage.getItem(authItemName);
    // 如果字符串不存在，返回null
    if (!str) {
        return null;
    }
    // 将认证信息字符串解析为对象
    const authObj = JSON.parse(str);
    // 如果认证信息过期，删除令牌并提示登录状态已过期
    if (new Date(authObj.expire) <= new Date()) {
        deleteAccessToken();
        ElMessage.warning("登录状态已过期，请重新登录！");
        return null;
    }
    // 返回访问令牌
    return authObj.token;
};

// 设置访问令牌
const setAccessToken = (remember, token, expire) => {
    // 构造认证信息对象
    const authObj = {
        token: token,
        expire: expire
    }
    // 将认证信息对象转换为字符串
    const str = JSON.stringify(authObj);
    // 根据记住状态选择存储方式
    if (remember) {
        localStorage.setItem(authItemName, str);
    } else {
        sessionStorage.setItem(authItemName, str);
    }
};

// 删除访问令牌
const deleteAccessToken = () => {
    localStorage.removeItem(authItemName);
    sessionStorage.removeItem(authItemName);
};

// 检查是否未经授权
const unauthorized = () => {
    return !getAccessToken()
};

// 检查会话存储中是否存在访问令牌
const checkSessionAccessToken = () => {
    const sessionToken = sessionStorage.getItem(authItemName);
    return sessionToken !== null;
};

export {
    getAccessToken,
    setAccessToken,
    deleteAccessToken,
    unauthorized,
    checkSessionAccessToken
};
