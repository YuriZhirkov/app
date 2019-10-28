import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      userId:'',
      userName:''
    },
    mutations: {
        setUserId(state,id){
          state.userId = id
          localStorage.setItem('uid',id)
        },
        setUserName(state,id){
          state.userName = id
          localStorage.setItem('username',id)
        },
        initUserId(state){
          const uid = localStorage.getItem('uid')
          if(!uid || uid =='') return
          state.userId = uid
        },
        initUserName(state){
          const uid = localStorage.getItem('username')
          if(!uid || uid =='') return
          state.userName = uid
        },
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        }
    },
   getters:{

   }
})
