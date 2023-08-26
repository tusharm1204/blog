import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
        name: 'LoginPage',
        path: '/login',
        component: () => import('../components/LoginPage.vue'),
    },
    {
        name: 'Admin',
        path: '/admin',
        component: () => import('../components/Admin.vue'),

        children: [
            {
                name: 'Deshboard',
                path: 'deshboard',
                component: () => import('../components/DeshBoard.vue'),

            },
            {
                name: 'Blog',
                path: 'blog',
                component: () => import('../components/Blog.vue'),

            },
            {
                name: 'Category',
                path: 'category',
                component: () => import('../components/Category.vue'),

            },
            {
                name: 'User',
                path: 'user',
                component: () => import('../components/User.vue'),

            },
            {
                name: 'Tags',
                path: 'tags',
                component: () => import('../components/Tags.vue'),

            },
            {
                name: 'Creatblog',
                path: 'creatblog',
                component: () => import('../components/CreatBlog.vue'),

            },
            {
                name: 'EditBlog',
                path: 'editBlog/:id',
                component: () => import('../components/EditBlog.vue'),

            },

        ]

    },
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router