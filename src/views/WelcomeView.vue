<template>
  <div style="width: 100vw;height:100vh;display:flex;justify-content: center;align-items: center;overflow: hidden">
    <el-card body-style="padding: 0" style="width: 400px; height: 500px;">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in-linear" mode="out-in">
          <component :is="Component" style="height: 100%"/>
        </transition>
      </router-view>
    </el-card>
  </div>
</template>
<script setup>

</script>

<style scoped>

</style>
