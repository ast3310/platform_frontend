import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/assets/styles/partials/index.scss';

import { axios_defaults_baseURL } from "./config";


createApp(App).use(store).use(router).use(ElementPlus).mount('#app')


axios.defaults.baseURL = axios_defaults_baseURL;
if (store.state.auth.currentUser) {
  axios.defaults.headers["Authorization"] =
    "Bearer " + store.state.auth.currentUser.token;
  store.dispatch("fetchCurrentUser");
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.hasOwnProperty("code") &&
        (error.response.data.code === "token_not_valid")
    ) {

      store.dispatch("logout");
      router.push("/login");
    }

    return Promise.reject(error);
  }
);
