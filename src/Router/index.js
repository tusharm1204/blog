import { createRouter, createWebHistory } from 'vue-router'
import auth from "../components/Middleware/auth"
import middlewarePipeline from '@/components/Middleware/middleware-pipeline'
const routes = [

    {
        name: 'BlogWeb',
        path: '/',
        component: () => import('../components/WebPage/BlogWeb.vue'),
    },
    {
        name: 'BlogShow',
        path: '/blogs/:id',
        component: () => import('../components/WebPage/BlogShow.vue'),
    },
    {
        name: 'LoginPage',
        path: '/login',
        component: () => import('../components/LoginPage.vue'),
        
    },
    {
        name: 'Sidebar',
        path: '/admin',
        redirect : '/admin/deshboard',
        meta: {
            middleware: [   
                auth,   
            ],
        },
        component: () => import('../components/SideBar.vue'),

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
                name: 'showBlog',
                path: 'showBlog/:id',
                component: () => import('../components/showBlog.vue'),
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
                path: 'tag',
                component: () => import('../components/Tags.vue')
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
    {
        name: 'PageNotFound',
        path: '/:pathMatch(.*)*',
        component: () => import('../components/PageNotFound.vue'),

    },
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {

    if (!to.meta.middleware) {
        return next()
       
    }
  
    const middleware = to.meta.middleware;
    const context = {
      
      to,
      from,
      next,
    }
  
    return middleware[0]({
        ...context,
        next:middlewarePipeline(context, middleware,1)
    })
  })
export default router