<template>
  <div style="width: 100%; height: 100%; display: flex;justify-content: center;align-items: center;">
    <div style="margin: 20px 30px; text-align: center">
      <div style="margin-top: 10px;font-size: 24px; font-weight: bold">用户登录</div>
      <div style="margin-top: 10px;font-size: 15px; color: gray">在进入系统之前请先输入用户名和密码进行登录</div>
      <el-form :model="loginForm" style="margin-top: 40px">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名/邮箱">
            <template #prefix>
              <el-icon>
                <User></User>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码">
            <template #prefix>
              <el-icon>
                <Lock></Lock>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12" style="text-align: left">
            <el-form-item>
              <el-checkbox v-model="loginForm.isRemember">记住我</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="text-align: right; line-height: 32px">
            <el-link type="primary" @click="toResetPage()">忘记密码</el-link>
          </el-col>
        </el-row>
      </el-form>
      <div style="margin-top: 50px">
        <el-button style="width: 270px" type="success" @click="login()" plain>立即登录</el-button>
      </div>
      <el-divider>
        <span style="color: grey;font-size: 13px">没有账号</span>
      </el-divider>
      <div>
        <el-button style="width: 270px" type="warning" @click="toRegisterPage()" plain>注册账号</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue';
import {Lock, User} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import router from "@/router";
import axios from "axios";

const loginForm = reactive({
  username: "",
  password: "",
  isRemember: false,
});

const toRegisterPage = () => {
  router.push('/register');
};

const toResetPage = () => {
  router.push('/reset');
};

const login = async () => {
  const res = await axios.post('/login.php', loginForm);
  const {code, data} = res.data;
  if (code === 200) {
    ElMessage.success(`登录成功，欢迎 ${data.username}`);
  } else {
    ElMessage.warning("账号或密码错误");
  }
};

</script>

<style scoped>

</style>