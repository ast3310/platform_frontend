import * as type from "./types.js";

export default {
  [type.TASKS_APPEND]: (state, payload) => {
    state.tasks = [...state.tasks, ...payload.results];
  },

  [type.SET_COUNT_NEXT_PAGE]: (state, payload) => {
    state.tasksCount = payload.count;
    state.tasksNextPage = payload.next;
  },

  [type.TASKS_ADD_LIST]: (state, payload) => {
    if(!!state.nextPage) state.tasks.pop();
    state.tasks = [payload, ...state.tasks];
  },

  [type.TASKS_SET_DESIGN_DATA]: (state, payload) => {
    if (!!state.task) {
      state.task = { ...state.task, design_data: payload };
    }
  },

  [type.TASKS_SET_ESTIMATION_DATA]: (state, payload) => {
    if (!!state.task) {
      state.task = { ...state.task, estimation_data: payload };
    }
  },

  [type.TASKS_CHANGE_AGREEMENT_DATA]: (state, payload) => {
    if (!!state.task) {
      state.task.agreements = state.task.agreements.map(e => e.agreement_id === payload.agreement_id ? payload : e);
    }
  },

  [type.TASKS_CARDS_CLEAR]: (state) => (state.tasks = []),
  [type.TASK_CARD_SET]: (state, payload) => (state.task = payload),
};

