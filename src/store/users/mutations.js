import * as type from "./types.js";

export default {
  [type.USERS_APPEND]: (state, payload) => {
    state.users = [...state.users, ...payload.results];
  },

  [type.SET_COUNT_NEXT_PAGE]: (state, payload) => {
    state.usersCount = payload.count;
    state.usersNextPage = payload.next;
  },

  [type.USERS_ADD_LIST]: (state, payload) => {
    if(!!state.nextPage) state.users.pop();
    state.users = [payload, ...state.users];
  },

  [type.USERS_CARDS_CLEAR]: (state) => (state.users = []),
  [type.USER_SET]: (state, payload) => (state.user = payload),
};

