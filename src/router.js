import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'main' },
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'empty' },
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'empty' },
      component: () => import('./views/Register.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'main' },
      component: () => import('./views/Categories.vue')
    },
    {
      path: '/detail-record',
      name: 'detail-record',
      meta: { layout: 'main' },
      component: () => import('./views/DetailRecord.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'main' },
      component: () => import('./views/History.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: { layout: 'main' },
      component: () => import('./views/Planning.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: 'main' },
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: { layout: 'main' },
      component: () => import('./views/Record.vue')
    },
  ]
})
