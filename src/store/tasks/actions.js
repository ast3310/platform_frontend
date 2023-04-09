import {
    TASKS_FETCH_LIST,
    TASKS_APPEND,
    TASKS_CREATE,
    TASKS_ADD_LIST,
    TASK_FETCH_ONE,
    TASK_CARD_SET,
    TASKS_SET_DESIGN_DATA,
    TASKS_SET_ESTIMATION_DATA,
    TASKS_COMPLETE_AGREEMENT,
    TASKS_CHANGE_AGREEMENT_DATA,
    TASKS_FETCH_MY_LIST,
    TASKS_SAVE_DESIGN_DATA,
    TASKS_SAVE_ESTIMATION_DATA,
    TASKS_COMPLETE_STAGE,
    SET_COUNT_NEXT_PAGE,
} from "./types.js";

import tasks from '../../api/tasks.js';

const TASKS_CARDS_START_PAGE = 1;

export default {
    async [TASKS_FETCH_LIST]({ commit }, { page = TASKS_CARDS_START_PAGE }) {
      try {
        const { isSuccess, data } = await tasks.getTasksList(page);
        
        if (isSuccess === true) {
          commit(SET_COUNT_NEXT_PAGE, data);
          commit(TASKS_APPEND, data);
  
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
    async [TASKS_FETCH_MY_LIST]({ commit }, { page = TASKS_CARDS_START_PAGE }) {
      try {
        const { isSuccess, data } = await tasks.getMyTasksList(page);
        
        if (isSuccess === true) {
          commit(SET_COUNT_NEXT_PAGE, data);
          commit(TASKS_APPEND, data);
  
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
    async [TASK_FETCH_ONE]({ commit }, { id }) {
      try {
        const { isSuccess, data } = await tasks.getTask(id);
        
        if (isSuccess === true) {
          commit(TASK_CARD_SET, data);
  
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
    async [TASKS_COMPLETE_STAGE]({ commit }, { id }) {
      try {
        const { isSuccess, data } = await tasks.stageCompletion(id);
        
        if (isSuccess === true) {
          commit(TASK_CARD_SET, data);
  
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
    async [TASKS_SAVE_DESIGN_DATA]({ commit, getters }, payload) {
      try {
        if (!getters.task) {
          return { success: false };
        }

        const { isSuccess, data } = await tasks.saveDesignData(getters.task.id, payload);
        
        if (isSuccess === true) {
          commit(TASKS_SET_DESIGN_DATA, payload);
  
          return {
            success: true,
          };
        }
  
        return { success: false };
      } catch (error) {
        return { success: false };
      }
    },
    async [TASKS_SAVE_ESTIMATION_DATA]({ commit, getters }, payload) {
      try {
        if (!getters.task) {
          return { success: false };
        }

        const { isSuccess, data } = await tasks.saveEstimationData(getters.task.id, payload);
        
        if (isSuccess === true) {
          commit(TASKS_SET_ESTIMATION_DATA, payload);
  
          return {
            success: true,
          };
        }
  
        return { success: false };
      } catch (error) {
        return { success: false };
      }
    },
    async [TASKS_COMPLETE_AGREEMENT]({ commit, getters }, { agreement_id }) {
      try {
        if (!getters.task) {
          return { success: false };
        }

        console.log(agreement_id);

        const { isSuccess, data } = await tasks.completeAgreement(getters.task.id, agreement_id);
        
        if (isSuccess === true) {
          commit(TASKS_CHANGE_AGREEMENT_DATA, data);
  
          return {
            success: true,
          };
        }
  
        return { success: false };
      } catch (error) {
        return { success: false };
      }
    },
    async [TASKS_CREATE]({ commit }, payload) {
        try {
            let executors_list = []

            if (payload.hasOwnProperty('executors')) {
                let executors = payload['executors'];
                for (let key in executors) {  
                    if (executors.hasOwnProperty(key)) {
                        const value = executors[key];

                        if (typeof value !== "object") return { success: false, data: null };

                        executors_list.push({
                            stage_type: key,
                            executor_id: value.id,
                        });
                    }
                }
            }

            if (Object.keys(executors_list).length === 0) return { success: false, data: null };

            const { isSuccess, data } = await tasks.createTask(
                { ...payload, stages_executers: executors_list }
            );

            console.log(isSuccess);
            
            if (isSuccess === true) {
              commit(TASKS_ADD_LIST, data);
      
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
  
  