import { createStore } from 'vuex'

import auth from "./auth";
import tasks from "./tasks/index";
import agreements from "./agreements/index";
import users from "./users/index";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [
    createPersistedState({
      paths: ["auth.currentUser"],
    }),
  ],
  modules: {
    auth,
    tasks,
    agreements,
    users,
  }
})
