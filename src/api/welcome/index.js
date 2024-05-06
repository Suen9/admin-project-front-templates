import { get, post } from '@/request/http.js';
import { ElMessage } from "element-plus";
import { deleteAccessToken, setAccessToken } from "@/utils/tokenUtil.js";

// 用户登录函数
const loginUser = async (userData, success) => {
    const response = await post('/auth/login', userData);
    const { code, message, data } = response;
    const { isRemember } = userData;

    if (code === 200) {
        ElMessage.success(`登录成功，欢迎 ${data.username}`);
        setAccessToken(isRemember, data.token, data.expire);
        success();
    } else {
        ElMessage.warning(message);
    }
};

// 用户退出登录函数
const logoutUser = async (success) => {
    const response = await post('/auth/logout');

    if (response.code === 200) {
        deleteAccessToken();
        ElMessage.success(`退出登录成功，欢迎您再次使用`);
        success();
    } else {
        ElMessage.warning("退出登录失败");
    }
};

// 用户通过邮箱注册函数
const registerUserByEmail = async (registrationData, success) => {
    const response = await post('/auth/register', registrationData);

    if (response.code === 200) {
        ElMessage.success(`注册成功，${registrationData.username}欢迎加入我们`);
        success();
    } else {
        ElMessage.warning("注册失败，请联系管理员");
    }
};

// 请求邮箱验证码函数
const requestEmailCode = async (email, type) => {
    const params = {
        email: email,
        type: type
    };
    const response = await get('/auth/ask-code', params);

    if (response.code === 200) {
        ElMessage.success(`验证码已发送到邮箱: ${email}，请注意查收`);
    } else {
        ElMessage.warning("验证码发送失败，请检查邮箱是否有校，或联系管理员");
    }
};

// 确认重置验证码函数
const confirmResetCode = async (email, code, success) => {
    const params = {
        email: email,
        code: code
    };
    const response = await post('/auth/reset-confirm', params);

    if (response.code === 200) {
        ElMessage.success(`验证通过`);
        success();
    } else {
        ElMessage.warning(`验证失败，请检查验证码是否正确`);
    }
};

// 重置用户密码函数
const resetUserPassword = async (resetData, success) => {
    const response = await post('/auth/reset-password', resetData);

    if (response.code === 200) {
        ElMessage.success(`重置密码成功`);
        success();
    } else {
        ElMessage.warning(`重置密码失败`);
    }
};

export {
    loginUser,
    logoutUser,
    registerUserByEmail,
    requestEmailCode,
    confirmResetCode,
    resetUserPassword
};
