<template>
  <div>
    <el-menu style="height: calc(100vh - 110px);border-right: 0!important;overflow-y: auto;"
             :default-active="$route.path"
             router>
      <div v-for="item in menuList" :key="item.name">
        <el-menu-item v-if="item.children.length === 0" :index="item.path">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
        <el-sub-menu v-if="item.children.length !== 0" :index="item.path">
          <template #title>
            <el-icon>
              <location/>
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
import {
  Menu as IconMenu,
  Location,
} from '@element-plus/icons-vue'
import {reactive} from 'vue'

const menuList = reactive(
    [
      {
        path: '/user',
        name: 'user',
        redirect: '/user/list',
        title: '用户',
        component: () => import('@/views/IndexView.vue'),
        children: [
          {
            path: '/user/list',
            name: 'user-list',
            title: '用户列表',
            component: () => import('@/page/user/List.vue')
          }
        ]
      },
      {
        path: '/content',
        name: 'content',
        title: '内容管理',
        component: () => import('@/views/IndexView.vue'),
        redirect: '/content/manage-images',
        children: [
          {
            path: '/content/manage-images',
            name: 'manage-images',
            title: '管理图片',
            component: () => import('@/page/content/Images.vue')
          },
          {
            path: '/content/manage-comment',
            name: 'manage-comment',
            title: '管理评论',
            component: () => import('@/page/content/Comment.vue')
          }
        ]
      },
      {
        path: '/book',
        name: 'book',
        title: '图书列表',
        component: () => import('@/page/book/List.vue'),
        children: []
      },
    ])
</script>

<style scoped>
</style>