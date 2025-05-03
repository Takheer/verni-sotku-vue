import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/pages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexPage,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/user/sign-in',
      name: 'user-sign-in',
      component: () => import('../pages/LoginPage.vue')
    },
    {
      path: '/spendings/:slug',
      name: 'spendings-slug',
      component: () => import('../pages/SpendingsGroupPage.vue')
    },
    {
      path: '/invite/:slug',
      name: 'invite-slug',
      component: () => import('../pages/InviteToGroupPage.vue')
    }
  ],
})

export default router
