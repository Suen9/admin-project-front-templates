import {createRouter, createWebHashHistory} from 'vue-router'
import {unauthorized} from "@/utils/tokenUtil.js";

const routes = [
    {
        path: '/',
        name: 'auth',
        component: () => import('@/views/WelcomeView.vue'),
        children: [
            {
                path: '',
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
            }
        ]
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('@/views/IndexView.vue'),
        children: []
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // 检查用户是否未经授权
    const isUnauthorized = unauthorized();

    // 如果用户试图进入需要授权的页面，并且已经被授权，则重定向至首页
    if (to.name.startsWith('auth') && !isUnauthorized) {
        next('/index');
    }
    // 如果用户试图访问首页，并且未经授权，则重定向至根路径
    else if (to.fullPath.startsWith('/index') && isUnauthorized) {
        next('/');
    }
    // 否则，允许用户继续导航
    else {
        next();
    }
});



export default router;