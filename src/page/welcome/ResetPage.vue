<template>
  <div style="margin: 20px 30px; text-align: center">
  <div style="margin-top: 10px; font-size: 25px; font-weight: bold">注册账号</div>
    <div style="margin-top: 10px;font-size: 14px; color: gray">欢迎注册我们的xx平台，请在下方填写相关信息</div>
    <div style="margin-top: 40px">
      <el-form :model="registerFrom" ref="registerFormRef">
        <el-form-item prop="username">
          <el-input v-model="registerFrom.username" :maxlength="8" type="text"
                    placeholder="用户名">
            <template #prefix>
              <el-icon>
                <User/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerFrom.password" :maxlength="16" type="password"
                    placeholder="密码">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="re_password">
          <el-input v-model="registerFrom.re_password" :maxlength="16" type="password"
                    placeholder="重复密码">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerFrom.email" type="text" placeholder="电子邮箱地址">
            <template #prefix>
              <el-icon>
                <Message/>
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
            <el-button style="width: 105px" @click="sendEmailCode()" type="success">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-button type="warning" @click="register" style="width: 270px;margin-top: 35px" plain>注册</el-button>
    <div style="margin-top: 20px">
      <span style="font-size: 14px;line-height: 15px;color: grey">已有账号? </span>
      <el-link type="primary" style="translate: 0 -2px" @click="router.push('/')">立即登录</el-link>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {User, Lock, Message, Key} from "@element-plus/icons-vue";
import router from "@/router/index.js";
import {ElMessage} from "element-plus";

const registerFormRef = ref();
const coldTime = ref("0");

const registerFrom = reactive({
  username: "",
  password: "",
  re_password: "",
  email: "",
  code: ""
});

const sendEmailCode = () => {
  countDown();
};

const register = () => {
  registerFormRef.value.validate((isValid) => {
    if (isValid) {
    } else {
      ElMessage.warning('请完整填写注册表单内容！')
    }
  })
}

const countDown = () => {
  coldTime.value = 60;
  const timer = setInterval(() => {
    coldTime.value--;
    if (coldTime.value === 0) {
      clearInterval(timer);
    }
  }, 1000);
};
</script>

<style scoped>

</style>