<template>
  <div style="width: 100%; height: 100%;">
    <div>
      <el-link type="primary" style="translate: 5px 2px" @click="()=>{router.push('/')}">返回登录界面</el-link>
    </div>
    <div style="margin-top: 50px; text-align: center;">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="验证电子邮件"/>
        <el-step title="重新设定密码"/>
      </el-steps>
      <transition name="el-fade-in-linear" mode="out-in">
        <div style="text-align: center;margin: 0 20px;height: 100%" v-if="active === 0">
          <div style="margin-top: 40px">
            <div style="font-size: 25px;font-weight: bold">重置密码</div>
            <div style="font-size: 14px;color: grey">请输入需要重置密码的电子邮件地址</div>
          </div>
          <el-form style="margin-top: 30px" @validate="onValidate" :model="resetForm" :rules="resetRules"
                   ref="resetFormRef">
            <el-form-item prop="email">
              <el-input v-model="resetForm.email" type="text" placeholder="电子邮箱地址">
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
                  <el-input v-model="resetForm.code" :maxlength="6" type="text"
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
          <div style="margin-top: 70px">
            <el-button @click="verifyCode" style="width: 270px;" type="danger" plain>开始重置密码</el-button>
          </div>
        </div>
      </transition>
      <transition name="el-fade-in-linear" mode="out-in">
        <div style="text-align: center;margin: 0 20px;height: 100%" v-if="active === 1">
          <div style="margin-top: 60px">
            <div style="font-size: 25px;font-weight: bold">重置密码</div>
            <div style="font-size: 14px;color: grey">请填写您的新密码，务必牢记，防止丢失</div>
          </div>
          <el-form style="margin-top: 20px" :model="resetForm" :rules="resetRules"
                   ref="resetFormRef">
            <el-form-item prop="password">
              <el-input v-model="resetForm.password" :maxlength="16" type="password"
                        placeholder="密码">
                <template #prefix>
                  <el-icon>
                    <Lock/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="re_password">
              <el-input v-model="resetForm.re_password" :maxlength="16" type="password"
                        placeholder="重复密码">
                <template #prefix>
                  <el-icon>
                    <Lock/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div style="margin-top: 70px">
            <el-button @click="doReset" style="width: 270px;" type="danger" plain>立即重置密码</el-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive} from "vue";
import {Key, Lock, Message} from "@element-plus/icons-vue";
import router from "@/router/index.js";
import {ElMessage} from "element-plus";

const coldTime = ref("0");
const active = ref(0)
const isEmailValid = ref(false);
const resetFormRef = ref();
const resetForm = reactive({
  email: '',
  code: '',
  password: '',
  re_password: '',
})

const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== resetForm.password) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

const resetRules = {
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

const verifyCode = () => {
  resetFormRef.value.validate((isValid) => {
    if (isValid) {
      active.value++
    } else {
      ElMessage.warning('请完整填写注册表单内容！');
    }
  })
}

const sendEmailCode = () => {
  countDown();
};

const doReset = () => {
  resetFormRef.value.validate((isValid) => {
    if (isValid) {
    } else {
      ElMessage.warning('请完整填写注册表单内容！');
    }
  })
}

const onValidate = (prop, isValid) => {
  if (prop === 'email') {
    isEmailValid.value = isValid;
  }
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
</script>

<style scoped>

</style>