import { createStore } from 'vuex'

import auth from "./auth";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [
    createPersistedState({
      paths: ["auth.currentUser"],
    }),
  ],
  modules: {
    auth
  }
})
