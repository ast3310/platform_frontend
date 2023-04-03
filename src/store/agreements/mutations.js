import * as type from "./types.js";

export default {
  [type.AGREEMENTS_APPEND]: (state, payload) => {
    state.agreements = [...state.agreements, ...payload.results];
  },

  [type.SET_COUNT_NEXT_PAGE]: (state, payload) => {
    state.count = payload.count;
    state.nextPage = payload.next;
  },

  [type.AGREEMENTS_ADD_LIST]: (state, payload) => {
    if(!!state.nextPage) state.agreements.pop();
    state.agreements = [payload, ...state.agreements];
  },

  [type.AGREEMENTS_CARDS_CLEAR]: (state) => (state.agreements = []),
  [type.AGREEMENTS_CARD_SET]: (state, payload) => (state.agreements = payload),
};

