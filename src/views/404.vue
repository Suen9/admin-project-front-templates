<template>
  <div class="err404" style="display: flex;flex-direction: column; justify-content: center;align-items: center">
    <h4>您访问的页面不见了！</h4>
    <h5>
      <router-link to="manage" class="go-home" @click="goHome()">去首页</router-link>
    </h5>
  </div>
</template>

<script setup>
import router from "@/router/index.js";

const goHome = () => {
  router.push('/')
}
</script>

<style>
.err404 {
  width: 100vw;
  height: 100vh;
  background: url(../../public/404.jpg) no-repeat 0 0
}

.err404 h4 {
  font-size: 24px;
  color: #ffffff;
  padding-bottom: 16px
}

.err404 .go-home {
  width: 130px;
  height: 38px;
  background: #c9141d;
  line-height: 38px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  display: inline-block;
  border-radius: 2px
}
</style>