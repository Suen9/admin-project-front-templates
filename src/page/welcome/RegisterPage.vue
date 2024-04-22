<template>
  <div style="width: 100%; height: 100%; display: flex;justify-content: center;align-items: center;">
    <div style="margin: 20px 30px; text-align: center">
      <div style="margin-top: 10px;font-size: 25px; font-weight: bold">注册账号</div>
      <div style="margin-top: 10px;font-size: 14px; color: gray">欢迎注册我们的xx平台，请在下方填写相关信息</div>
      <div style="margin-top: 40px">
        <el-form :model="registerFrom">
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
              <el-button style="width: 105px" @click="" type="success">获取验证码</el-button>
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
import {reactive} from 'vue';
import {Lock, User, Message, Key} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";
import axios from "axios";

const registerFrom = reactive({
  username: "",
  password: "",
  re_password: "",
  email: "",
});

const toLoginPage = () => {
  router.push('/');
}

const register = async () => {
  const res = await axios.post('/register.php', registerFrom);
  const {code, msg} = res.data;
  if (code === 200) {
    ElMessage.success(`注册成功`);
  } else {
    ElMessage.warning(msg ? msg : "注册失败");
  }
}
</script>

<style scoped>

</style>