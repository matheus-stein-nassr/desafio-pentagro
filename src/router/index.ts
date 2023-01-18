/* eslint-disable prettier/prettier */
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

import RegisterUser from '@/components/RegisterUser.vue'
import ListUsers from '@/components/ListUsers.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      children: [
        { path: '', name: 'listUsers', component: ListUsers},
        { path: 'register', name: 'registerUser', component: RegisterUser},
      ]
    }
  ],
})

export default router
