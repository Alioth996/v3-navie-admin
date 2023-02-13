import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home/index.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
