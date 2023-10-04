import { createStore } from "vuex";

export default createStore({
          state:{
                    user:"",
          },
          mutations :{
          loginUser(state,user){
                    state.user = user ;
                    localStorage.setItem('user', JSON.stringify(user))  
          },
          logOut(state){
                    state.user = '';
                    localStorage.clear();
          }
          },
          actions:{

          }
})