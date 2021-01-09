import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  // 與 Vue 物件內的 data 屬性類似，是放置資料的地方
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  //  commit 發動 mutations
  mutations: {
    setCurrentUser(state, currentUser) {
      // state - 傳入上方的 state 物件，準備變更物件內容
      // currentUser - 接收從 Vue component 傳入的資料，通常會以「想要更新的 state 屬性」來命名這組參數
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser(data.user傳入的資料) 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者驗證用的 token 儲存在 state 中
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {} //將currentUser 清空
      state.isAuthenticated = false
      // 登出時一併將 state 內的 token 移除
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  // dispatch 發動 actions
  actions: {
    // 在 actions 中可以透過參數的方式取得 commit 的方法
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await userAPI.getCurrentUser()
        const { id, name, email, image, isAdmin } = data

        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin
        })
        return true //當 token 是有效的情況下，這個函式會為傳 true，否則會回傳 false
      } catch (error) {
        console.log('error', error)
        // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
