<template>
  <div style="width: 100%; height: 100%; display: flex;justify-content: center;align-items: center;">
    <div style="margin: 20px 30px; text-align: center">
      <div style="margin-top: 10px;font-size: 25px; font-weight: bold">注册账号</div>
      <div style="margin-top: 10px;font-size: 14px; color: gray">欢迎注册我们的xx平台，请在下方填写相关信息</div>
      <div style="margin-top: 40px">
        <el-form :model="registerFrom" @validate="onValidate" :rules="registerRules" ref="registerFormRef">
          <el-form-item prop="username">
            <el-input v-model="registerFrom.username" :maxlength="8" type="text"
                      placeholder="用户名">
              <template #prefix>
                <el-icon>
                  <User></User>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerFrom.password" :maxlength="16" type="password"
                      placeholder="密码">
              <template #prefix>
                <el-icon>
                  <Lock></Lock>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="re_password">
            <el-input v-model="registerFrom.re_password" :maxlength="16" type="password"
                      placeholder="重复密码">
              <template #prefix>
                <el-icon>
                  <Lock></Lock>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="registerFrom.email" type="text" placeholder="电子邮箱地址">
              <template #prefix>
                <el-icon>
                  <Message></Message>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-row style="width: 100%" :gutter="10">
            <el-col :span="17">
              <el-form-item prop="code">
                <el-input v-model="registerFrom.code" :maxlength="6" type="text"
                          placeholder="验证码">
                  <template #prefix>
                    <el-icon>
                      <Key/>
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-button style="width: 105px" @click="sendEmailCode" type="success"
                         :disabled="!isEmailValid || coldTime > 0">
                {{ coldTime > 0 ? '请稍后 ' + coldTime + ' 秒' : '获取验证码' }}
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-button type="warning" style="width: 270px;margin-top: 30px" @click="register()" plain>注册</el-button>
      <div style="margin-top: 10px">
        <span style="font-size: 14px;line-height: 15px;color: grey">已有账号? </span>
        <el-link type="primary" @click="toLoginPage()" style="translate: 0 -2px">立即登录</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {Lock, User, Message, Key} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";

const isEmailValid = ref(false);
const registerFormRef = ref();
const coldTime = ref("0");
const registerFrom = reactive({
  username: "",
  password: "",
  re_password: "",
  email: "",
});

const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
    callback(new Error('用户名不能包含特殊字符，只能是中文/英文'));
  } else {
    callback();
  }
};

const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== registerFrom.password) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

const registerRules = {
  username: [
    {validator: validateUsername, trigger: ['blur', 'change']},
    {min: 2, max: 8, message: '用户名的长度必须在2-8个字符之间', trigger: ['blur', 'change']},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: ['blur', 'change']},
    {min: 6, max: 16, message: '密码的长度必须在6-16个字符之间', trigger: ['blur', 'change']}
  ],
  re_password: [
    {validator: validatePassword, trigger: ['blur', 'change']},
  ],
  email: [
    {required: true, message: '请输入邮件地址', trigger: ['blur', 'change']},
    {type: 'email', message: '请输入合法的电子邮件地址', trigger: ['blur', 'change']}
  ],
  code: [
    {required: true, message: '请输入获取的验证码', trigger: ['blur', 'change']},
  ]
};

const onValidate = (prop, isValid) => {
  if (prop === 'email')
    isEmailValid.value = isValid;
};

const toLoginPage = () => {
  router.push('/');
}

const sendEmailCode = () => {
  countDown();
};


const countDown = () => {
  coldTime.value = 60;
  const timer = setInterval(() => {
    coldTime.value--;
    if (coldTime.value === 0) {
      clearInterval(timer);
    }
  }, 1000);
};

const register = () => {
  registerFormRef.value.validate((isValid) => {
    if (isValid) {
      //注册逻辑
    } else {
      ElMessage.warning('请完整填写注册表单内容！')
    }
  })
}

</script>

<style scoped>

</style>