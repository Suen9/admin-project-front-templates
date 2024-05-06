<template>
  <div class="common-layout">
    <el-container style="width: 100vw; height: 100vh">
      <el-aside width="200px" style="padding: 0">
        <Aside/>
      </el-aside>
      <el-container>
        <el-header height="50px" style="border-left: 1px solid #F0F0F0;border-bottom: 1px solid #DCDFE6;padding: 0" >
          <Header/>
        </el-header>
        <el-main style="background-color: #F1F2F5">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from "@/component/index/Aside.vue";
import Header from "@/component/index/Header.vue";

</script>

<style scoped>

</style>