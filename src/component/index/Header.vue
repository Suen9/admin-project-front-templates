<template>
  <div>
    <el-row>
      <el-row style="width: 100%; height: 100%;display: flex;align-items: center;justify-content: center">
        <el-col :span="12" style="width: 100%;height: 50px; display: flex;align-items: center;padding: 20px">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item style="font-weight: bold" :to="{ path: '/user/list' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.path"
                                :to="{ path: breadcrumb.path }">
              {{ breadcrumb.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="12"
                style="width: 100%;height: 50px;display: flex;align-items: center;justify-content: flex-end">
          <el-dropdown trigger="click">
              <div
                  @mouseenter="mouseEnter('info')" @mouseleave="mouseLeave('info')" :style="getButtonStyle('info')"
                  style="width:100px; height: 49px;display: flex; align-items: center;justify-content: center">
                <el-avatar
                    shape="square" :size="32"
                    :src="avatar"/>
                <div style="font-size: 14px;margin-left: 10px">admin</div>
              </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>


          <div @mouseenter="mouseEnter('setting')" @mouseleave="mouseLeave('setting')"
               :style="getButtonStyle('setting')"
               style="width:40px; height:49px;display: flex; align-items: center;justify-content: center">
            <el-icon>
              <Setting/>
            </el-icon>
          </div>

        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import {ArrowRight} from "@element-plus/icons";
import router from "@/router/index.js";

const avatar = ref("https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png");
const currentPath = computed(() => {
  return router.currentRoute.value.path
});
const breadcrumbs = ref([]);
const menuList = JSON.parse(sessionStorage.getItem("menu"));
const buttonStates = ref({
  info: '',
  setting: ''
});

const findRouteByPath = (routes, path) => {
  for (let route of routes) {
    if (route.path === path) {
      return [{
        title: route.title,
        path: route.path
      }];
    }
    if (route.children && route.children.length > 0) {
      const childRoutes = findRouteByPath(route.children, path);
      if (childRoutes.length > 0) {
        if (route.root === "0" && route.parentId === 0) {
          return [{
            title: route.title,
            path: route.redirect
          }, ...childRoutes];
        } else {
          return [{
            title: route.title,
            path: route.path
          }, ...childRoutes];
        }
      }
    }
  }
  return [];
};

const mouseEnter = (button) => {
  buttonStates.value[button] = 'background-color: #F6F6F6';
}

const mouseLeave = (button) => {
  buttonStates.value[button] = '';
}

const getButtonStyle = (button) => {
  return buttonStates.value[button];
}

watch(() => currentPath,
    (newValue) => {
      breadcrumbs.value = findRouteByPath(menuList, newValue.value);
    },
    {
      immediate: true,
      deep: true
    }
)

</script>

<style scoped>

</style>
