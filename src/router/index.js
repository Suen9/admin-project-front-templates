import {createRouter, createWebHashHistory} from 'vue-router'
import {unauthorized} from "@/utils/tokenUtil.js";
import config from "@/router/config.js";
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
        path: '/index',
        name: 'index',
        component: () => import('@/views/IndexView.vue'),
        children: []
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export const init = async () => {
    if (!isUnauthorized){
        console.log("router初始化中");
        await getMenu().forEach((route) => router.addRoute('index', route));
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

const getMenu = () => {
    return config;
}
export default router;