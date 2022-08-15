import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../store/auth'
const routes = [
    {
        path: '/',
        name: 'home',
        meta: { title: 'Home' },
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/login',
        name: 'login',
        meta: { title: 'Login' },
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/registration',
        name: 'registration',
        meta: { title: 'Registration' },
        component: () => import('../views/Registration.vue'),
    },
    {
        path: '/:catchAll(.*)*',
        name: '404',
        meta: { title: '404' },
        component: () => import('../views/404.vue'),
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: 'text-yellow',
})


export default router
