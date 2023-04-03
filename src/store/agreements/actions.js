import {
    AGREEMENTS_FETCH_LIST,
    AGREEMENTS_APPEND,
    AGREEMENTS_CREATE,
    AGREEMENTS_ADD_LIST,
    SET_COUNT_NEXT_PAGE,
} from "./types.js";

import agreements from '../../api/agreements.js';

const TASKS_CARDS_START_PAGE = 1;

export default {
    async [AGREEMENTS_FETCH_LIST]({ commit }, { page = TASKS_CARDS_START_PAGE }) {
      try {
        const { isSuccess, data } = await agreements.getAgreementsList(page);
        
        if (isSuccess === true) {
          commit(SET_COUNT_NEXT_PAGE, data);
          commit(AGREEMENTS_APPEND, data);
  
          return {
            success: true,
            data,
            existsNextPage: data.next !== null,
          };
        }
  
        return { success: false, data: null };
      } catch (error) {
        return { success: false, data: null };
      }
    },
    async [AGREEMENTS_CREATE]({ commit }, payload) {
        try {

            if (!payload.hasOwnProperty('name')) {
                return { success: false, data: null };
            }


            const { isSuccess, data } = await agreements.createAgreement(
                { name: payload.name }
            );
            
            if (isSuccess === true) {
              commit(AGREEMENTS_ADD_LIST, data);
      
              return {
                success: true,
                data,
              };
            }
      
            return { success: false, data: null };
          } catch (error) {
            return { success: false, data: null };
          }
    },
  };
  
  