import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Signin',
    // beforeEnter(to, from, next) {
    //   if (this.$session.exists()) {
    //     next({ name: 'Dashboard' })
    //   }
    // },
    component: () => import(/* webpackChunkName: "signin" */ '../views/Signin.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // beforeEnter() {
    //   if (!this.$session.exists()) {
    //     this.$router.push("/");
    //   }
    // },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
