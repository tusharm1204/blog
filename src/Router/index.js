import { createRouter, createWebHistory } from 'vue-router'
import auth from "../components/Middleware/auth"
import middlewarePipeline from '@/components/Middleware/middleware-pipeline'
const routes = [

    {
        name: 'LoginPage',
        path: '/login',
        component: () => import('../components/LoginPage.vue'),
        
    },
    {
        name: 'Admin',
        path: '/admin',
        meta: {
            middleware: [   
                auth,   
            ],
        },
        component: () => import('../components/Admin.vue'),

        children: [
            {
                name: 'Deshboard',
                path: 'deshboard',
                component: () => import('../components/DeshBoard.vue'),
                meta: {
                    middleware: [   
                        auth,   
                    ],
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
                },
            },
            {
                name: 'Category',
                path: 'category',
                component: () => import('../components/Category.vue'),
                meta: {
                    middleware: [   
                        auth,   
                    ],
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
                },
            },
            {
                name: 'Tags',
                path: 'tags',
                component: () => import('../components/Tags.vue'),
                meta: {
                    middleware: [   
                        auth,   
                    ],
                },
            },
            {
                name: 'Creatblog',
                path: 'creatblog',
                component: () => import('../components/CreatBlog.vue'),
                meta: {
                    middleware: [   
                        auth,   
                    ],
                },
            },
            {
                name: 'EditBlog',
                path: 'editBlog/:id',
                component: () => import('../components/EditBlog.vue'),
                meta: {
                    middleware: [   
                        auth,   
                    ],
                },
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

    /** Navigate to next if middleware is not applied */
    if (!to.meta.middleware) {
        return next()
       
    }
  
    const middleware = to.meta.middleware;
    const context = {
      
      to,
      from,
      next,
      //   store  | You can also pass store as an argument
    }
  
    return middleware[0]({
        ...context,
        next:middlewarePipeline(context, middleware,1)
    })
  })
export default router