import axios from "axios";


export default {
  state: {
    currentUser: null,
  },
  actions: {
    async fetchCurrentUser({ commit }) {
        const { data } = await axios.get("/api/users/profile/");
        commit("setCurrentUser", data);
      },
    async createToken({ commit, dispatch }, payload) {
      try {
        const tokenData = await axios.post(
          "/api/token/",
          payload
        );

        if (tokenData.data.access) {
          axios.defaults.headers[
            "Authorization"
          ] = `Bearer ${tokenData.data.access}`;
          
          commit("setCurrentUser", { token: tokenData.data.access });
          dispatch("fetchCurrentUser");
        }
      } catch (e) {
        return {
          error: true,
        };
      }

      return {
        error: false,
        accountActivated: true,
      };
    },
    async requestResetPassword(_, payload) {
      try {
        let results = {
          emailIsSent: false,
          notFoundUser: false,
        };

        const { status } = await axios.post(
          "/auth/users/reset_password/",
          payload
        );

        if (status === 204) {
          results.emailIsSent = true;
        }

        return results;
      } catch (e) {
        return { error: true, message: "Ошибка на сервере" };
      }
    },
    async setNewPassword(_, payload) {
      let results = {
        passwordIsChanged: false,
        passwordIsTooCommon: false,
      };

      try {
        const data = await axios.post("/auth/users/reset_password_confirm/", {
          uid: payload.uid,
          token: payload.token,
          new_password: payload.password,
          re_new_password: payload.passwordRepeat,
          recaptchaToken: payload.recaptchaToken,
        });

        if (data.status === 204) {
          results.passwordIsChanged = true;
        }

        return results;
      } catch (e) {
        if (
          e.response.data.new_password &&
          e.response.data.new_password[0] === "This password is too common."
        ) {
          results.passwordIsTooCommon = true;
          return results;
        }
        return { error: true, message: "Ошибка на сервере" };
      }
    },
    async mailConfirmation(_, payload) {
      try {
        let results = {
          isActivated: false,
          otherError: false,
        };

        const data = await axios.post("/auth/users/activation/", {
          uid: payload.uid,
          token: payload.token,
        });

        if (data.status === 204) {
          results.isActivated = true;
        }

        return results;
      } catch (e) {
        return { error: true, message: "Ошибка на сервере" };
      }
    },
    
    async logout({ commit }) {
      commit("logout_mutations");
    },
  },
  mutations: {
    logout_mutations(state) {
      delete axios.defaults.headers["Authorization"];
      state.currentUser = null;
    },
    setCurrentUser(state, UserData) {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...UserData };
      } else {
        state.currentUser = UserData;
      }
    },
  },
  getters: {
    currentUser(state) {
      return state.currentUser;
    },

    isUserAuthorized(state) {
      return !!state.currentUser;
    },
  },
};
