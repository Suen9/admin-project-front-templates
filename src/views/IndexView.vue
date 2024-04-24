<template>
  <div>
    <el-button @click="userLogout" type="primary" plain>退出登录</el-button>
  </div>
</template>

<script setup>
import router from "@/router";
import {logoutUser} from "@/api/welcome/index.js";

const userLogout = () => {
  logoutUser(() => {
    router.push('/')
  })
};

</script>

<style scoped>

</style>