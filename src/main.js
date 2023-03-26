import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

import '@/assets/styles/partials/index.scss';

import { axios_defaults_baseURL } from "./config";

createApp(App).use(store).use(router).mount('#app')


axios.defaults.baseURL = axios_defaults_baseURL;
if (store.state.auth.currentUser) {
  axios.defaults.headers["Authorization"] =
    "Bearer " + store.state.auth.currentUser.token;
  store.dispatch("fetchCurrentuser");
}
