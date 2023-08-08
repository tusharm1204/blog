import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
        name: 'Login',
        path: '/login',
        component: () => import('../components/Login.vue'),
    },
    {
        name: 'Layout',
        path: '/',
        component: () => import('../components/Layout.vue'),

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

        ]

    },
    // {
    //     name: 'Modal',
    //     path: '/modal',
    //     component: () => import('../components/Modal.vue'),
    // },



]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// router.beforeEach(() => {
//     let user = localStorage.getItem('user');
//     if (user) {
//         return true;
//         // this.$router.push({
//         //     name: 'DashBoard'
//         // });
//     }else{
//         return false;
//         // this.$router.push({
//         //     name: 'LoginPage'
//         // });
//     }  
//   });
export default router