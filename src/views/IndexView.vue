<template>
  <div class="common-layout">
    <el-container style="width: 100vw; height: 100vh">
      <el-header style="border-bottom: 1px solid #DCDFE6;padding: 0">
        <Header/>
      </el-header>
      <el-container>
        <el-aside width="200px" style="padding: 0">
          <Aside/>
        </el-aside>
        <el-main style="border-left: 1px solid #DCDFE6;padding: 0">
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