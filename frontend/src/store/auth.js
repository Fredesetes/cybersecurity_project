export default (axios) => {
  return {
    state: {
      user: null,
      token: null
    },
    mutations: {
      resetUser(state) {
        if(state.user) state.user = null;
        if(state.token) state.token = null;
      },
      setUser(state, loggedInUser) {
        state.user = loggedInUser;
      },
      setToken(state, loggedInToken) {
        state.token = loggedInToken;
      }
    },
    getters: {
      user: (state) => {
        return state.user;
      },
      token: (state) => {
        return state.token;
      }
    },
    actions: {
      async login(context, accountData) {
        try {
          const { data } = await axios.post('users/login', accountData);
          const accessToken = data.token;
          axios.defaults.headers.common.Authorization = "Bearer " + accessToken;
          context.commit('setToken', accessToken);
          context.commit('setUser', data.user);
        } catch(error) {
          delete axios.defaults.headers.common.Authorization;
          context.commit('resetUser', null);
          throw error;
        }
      },
      async restartAuth(context) {  
        delete axios.defaults.headers.common.Authorization;
        context.commit('resetUser', null);
        return null;
      },
      async logout(context) {
        delete axios.defaults.headers.common.Authorization;
        context.commit('resetUser', null);
      }
    }
  }
};