import actions from "./actions.js";
import mutations from "./mutations.js";


export default {
    state: {
      tasksCount: 0,
      tasksNextPage: null,
      tasks: [],
      task: null,
    },
    getters: {
      tasks: (state) => {
        return state.tasks;
      },

      task: (state) => {
        return state.task;
      },

      tasksCount: (state) => {
        return state.tasksCount;
      },

      tasksNextPage: (state) => {
        return state.tasksNextPage;
      },
    },
    actions,
    mutations,
  };
  
  