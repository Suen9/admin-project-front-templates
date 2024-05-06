<template>
  <div style="width: 200px;height: 60px;position: fixed;top: 0;left: 0;">
    <el-image style="padding: 5px" src="https://element-plus.org/images/element-plus-logo.svg"/>
  </div>
  <div>
    <el-menu style="height: calc(100vh - 110px);border-right: 0!important;overflow-y: auto;margin-top: 60px;"
             :default-active="$route.path"
             router>
      <div v-for="item in menuList" :key="item.name">
        <el-menu-item v-if="item.children.length === 0" :index="item.path">
          <el-icon>
            <component class="icons" :is="item.icon" ></component>
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
        <el-sub-menu v-if="item.children.length !== 0" :index="item.path">
          <template #title>
            <el-icon>
            <component class="icons" :is="item.icon" ></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="ch in item.children" :key="ch.name" :index="ch.path">
            {{ ch.title }}
          </el-menu-item>
        </el-sub-menu>
      </div>
    </el-menu>
  </div>
  <div style="width: 200px;height: 50px;position: fixed;bottom: 0;left: 0;">
  </div>
</template>

<script setup>
const menuList = JSON.parse(sessionStorage.getItem("menu"))
</script>

<style scoped>
</style>