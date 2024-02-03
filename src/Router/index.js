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
        path: "/categories/:id/blogs",
        name: "ShowCategory",
        component: () => import('../components/ShowCategory.vue'),
      },
    {
        name: 'LoginPage',
        path: '/login',
        component: () => import('../components/LoginPage.vue'),
        
    },   
    {
        name: 'Contact Us',
        path: '/contact',
        component: () => import('../components/WebPage/Contact.vue'),
        
    },
    {
        name: 'Sidebar',
        path: '/admin',
        redirect : '/admin/dashboard',
        meta: {
            middleware: [   
                auth,   
            ],
        },
        component: () => import('../components/SideBar.vue'),

        children: [
            {
                name: 'Deshboard',
                path: 'dashboard',
                component: () => import('../components/DeshBoard.vue'),
                meta: {
                    middleware: [   
                        auth,   
                    ],
                    title:'Dashboard'
                },
            },
             {
                name: 'Contact Us',
                path: 'contact',
                component: () => import('../components/Contact.vue'),
                meta: {
                    middleware: [   
                        auth,   
                    ],
                    title:'Contact us'
                },
            },
            {
                name: 'Blog',
                path: 'blog',
                component: () => import('../components/Blog.vue'),
                meta: {
                    middleware: [   
                        auth,   
                    ],
                    title:'Blogs'
                },
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
                meta: {
                    middleware: [   
                        auth,   
                    ],
                    title:'Categories'
                },
            },
            {
                name: 'User',
                path: 'user',
                component: () => import('../components/User.vue'),
                meta: {
                    middleware: [   
                        auth,   
                    ],
                    title:'Users'
                },
            },
            {
                name: 'Tags',
                path: 'tag',
                component: () => import('../components/Tags.vue'),
                meta: {
                    middleware: [   
                        auth,   
                    ],
                    title:'Tags'
                },
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