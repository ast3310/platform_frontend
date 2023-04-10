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
    path: '/userSettings/:id',
    name: 'userSettings',
    component: () => import('../views/ProfileSettingsView.vue'),
    meta: { accessTokenExpected: true },
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('../views/ClientsView.vue'),
    meta: { 
      accessTokenExpected: true,
      accessOnlyAdmin: true,
    },
  },
  {
    path: '/agreements',
    name: 'agreements',
    component: () => import('../views/AgreementsView.vue'),
    meta: { accessTokenExpected: true },
  },
  {
    path: '/workers',
    name: 'workers',
    component: () => import('../views/WorkersView.vue'),
    meta: { 
      accessTokenExpected: true,
      accessOnlyAdmin: true,
    },
  },
  {
    path: '/activate',
    name: 'activate',
    component: () => import('../views/ActivateView.vue'),
    meta: {},
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
  const isTokenExpectedAndExist =
    (to.matched.some((r) => r.meta.accessTokenExpected) &&
      store.state.auth.currentUser) ||
    !to.matched.some((r) => r.meta.accessTokenExpected);
  
  const isAdminAdminAccess =
    (to.matched.some((r) => r.meta.accessOnlyAdmin) &&
      store.state.auth?.currentUser?.is_staff) ||
    !to.matched.some((r) => r.meta.accessOnlyAdmin);
  if (isTokenExpectedAndExist && isAdminAdminAccess) {
    return next();
  }
  
  router.push("/login");
});


export default router
