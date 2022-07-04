import {phoneLogin, logout} from "@/api/login";
import storage from "store";
import {ACCESS_TOKEN} from "@/store/mutation-types";

const loginStore = {
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },
  actions: {
    Login({commit}, loginInfo) {
      return new Promise((resolve, reject) => {
        phoneLogin(loginInfo).then(res => {
          const {loginSuccess, failedDesc, extendData} = res.data;
          if (loginSuccess) {
            const {token} = JSON.parse(extendData);
            console.log("token",token)
            if (token) {
              storage.set(ACCESS_TOKEN, token)
            }

            resolve()
          } else {
            reject(failedDesc)
          }
        }).catch(error => {
          reject(error)
        })
      });
    },

    // 登出
    Logout({commit, state}) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          resolve()
        }).catch((err) => {
          console.log('logout fail:', err)
          // resolve()
        }).finally(() => {
        })
      })
    }
  }
}

export default loginStore
