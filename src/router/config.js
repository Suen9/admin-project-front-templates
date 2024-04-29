const serverRouter = [
    {
        path: '/user',
        name: 'user',
        redirect: '/user/list',
        title: '用户',
        component: '',
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
        component: '',
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
    }
]

export default serverRouter