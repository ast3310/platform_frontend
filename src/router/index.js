import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import store from "@/store/index";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { accessTokenExpected: true },
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignInView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(store.state.auth)
  const isTokenExpectedAndExist =
    (to.matched.some((r) => r.meta.accessTokenExpected) &&
      store.state.auth.currentUser) ||
    !to.matched.some((r) => r.meta.accessTokenExpected);
  if (isTokenExpectedAndExist) {
    return next();
  }
  
  router.push("/login");
});


export default router
