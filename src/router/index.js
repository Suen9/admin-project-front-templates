import {createRouter, createWebHashHistory } from 'vue-router'

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
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;