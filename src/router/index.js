import {createRouter, createWebHashHistory} from 'vue-router'
import {getAccessToken, unauthorized} from "@/utils/tokenUtil.js";
import axios from "axios";

const modules = import.meta.glob('../page/*/*.vue');
const isUnauthorized = unauthorized();

const routes = [
    {
        path: '/',
        name: 'auth',
        component: () => import('@/views/WelcomeView.vue'),
        children: [
            {
                path: '/',
                name: 'auth-login',
                component: () => import('@/page/welcome/LoginPage.vue'),
            },
            {
                path: '/register',
                name: 'auth-register',
                component: () => import('@/page/welcome/RegisterPage.vue'),
            },
            {
                path: '/reset',
                name: 'auth-reset',
                component: () => import('@/page/welcome/ResetPage.vue'),
            },

        ]
    },
    {
        path: '/user/list',
        name: 'index',
        title: '首页',
        component: () => import('@/views/IndexView.vue'),
        children: []
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue')
    },
    {
        path: '/:pathMatch(.*)',
        name: 'error',
        redirect: '/404'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export const init = async () => {
    if (!isUnauthorized) {
        console.log("router初始化中");
        const response = await axios.get("http://localhost:8090/menu/nav", {
            headers: {
                "Authorization": `Bearer ${getAccessToken()}`
            }
        })
        const menu = response.data.data;
        await dynamicMenu(menu);
        sessionStorage.setItem("menu", JSON.stringify(response.data.data));
    }
}

router.beforeEach((to, from, next) => {
    // 如果用户试图进入需要授权的页面，并且已经被授权，则重定向至首页
    if (to.name.startsWith('auth') && !isUnauthorized) {
        next('/index');
    }
    // 如果用户试图访问首页，并且未经授权，则重定向至根路径
    else if (!to.name.startsWith('auth') && isUnauthorized) {
        next('/');
    }
    // 否则，允许用户继续导航
    else {
        next();
    }
});

const dynamicMenu = (menu) => {
    if (!menu) return;
    menu.forEach((item) => {
        if (item.component) {
            item.component = modules[`../page${item.component}.vue`]
            router.addRoute("index", item)
        }
        if (item.children) {
            dynamicMenu(item.children);
        }
    });
};


export default router;