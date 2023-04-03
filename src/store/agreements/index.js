import actions from "./actions.js";
import mutations from "./mutations.js";


export default {
    state: {
      agreementsCount: 0,
      agreementsNextPage: null,
      agreements: [],
      agreement: null,
    },
    getters: {
      agreements: (state) => {
        return state.agreements;
      },

      agreement: (state) => {
        return state.agreement;
      },

      agreementsCount: (state) => {
        return state.agreementsCount;
      },

      agreementsNextPage: (state) => {
        return state.agreementsNextPage;
      },
    },
    actions,
    mutations,
  };
  
  