import Vue from 'vue'
import Vuex from 'vuex'

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
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      // state - 傳入上方的 state 物件，準備變更物件內容
      // currentUser - 接收從 Vue component 傳入的資料，通常會以「想要更新的 state 屬性」來命名這組參數
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      state.isAuthenticated = true
    }
  },
  actions: {
  },
  modules: {
  }
})
