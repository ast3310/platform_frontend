import actions from "./actions.js";
import mutations from "./mutations.js";


export default {
    state: {
      usersCount: 0,
      usersNextPage: null,
      users: [],
      user: null,
    },
    getters: {
      users: (state) => {
        return state.users;
      },

      user: (state) => {
        return state.user;
      },

      usersCount: (state) => {
        return state.usersCount;
      },

      usersNextPage: (state) => {
        return state.usersNextPage;
      },
    },
    actions,
    mutations,
  };
  
  