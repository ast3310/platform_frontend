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
    component: () => import('../views/SignInView.vue')
  },
  {
    path: '/task/:id',
    name: 'task',
    component: () => import('../views/TaskView.vue'),
    meta: { accessTokenExpected: true },
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('../views/ClientsView.vue'),
    meta: { accessTokenExpected: true },
  },
  {
    path: '/agreements',
    name: 'agreements',
    component: () => import('../views/AgreementsView.vue'),
    meta: { accessTokenExpected: true },
  },
  {
    path: "/404",
    name: '404',
    component: () => import('../views/NotFoundView.vue'),
    meta: { accessTokenExpected: true },
  },
  {
    path: "/:catchAll(.*)", 
    redirect: '/404',
  },
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
