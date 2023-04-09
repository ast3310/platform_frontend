import {
    USERS_FETCH_LIST,
    USER_FETCH_ONE,
    USER_SET,
    USERS_CREATE,
    USERS_APPEND,
    USER_UPDATE,
    USERS_ADD_LIST,
    SET_COUNT_NEXT_PAGE,
} from "./types.js";

import users from '../../api/users.js';

const USERS_CARDS_START_PAGE = 1;

export default {
    async [USERS_FETCH_LIST]({ commit }, { page = USERS_CARDS_START_PAGE }) {
      try {
        const { isSuccess, data } = await users.getList({
            page: page
        });
        
        if (isSuccess === true) {
          commit(SET_COUNT_NEXT_PAGE, data);
          commit(USERS_APPEND, data);
  
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
    async [USERS_CREATE]({ commit }, payload) {
      try {
          const { isSuccess, data } = await users.createUser(payload);
          
          if (isSuccess === true) {
            commit(USERS_ADD_LIST, data);
    
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
    async [USER_FETCH_ONE]({ commit }, { id, isProfile }) {
      try {
          const { isSuccess, data } = await users.getUser(id, !!isProfile);
          
          if (isSuccess === true) {
            commit(USER_SET, data);
    
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
    async [USER_UPDATE]({ commit, getters }, { id, payload }) {
      try {
          const { isSuccess, data } = await users.updateUser(id, payload);
          
          if (isSuccess === true) {
            if (getters.user?.id === id) {
              commit(USER_SET, data);
            }
    
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
  
  