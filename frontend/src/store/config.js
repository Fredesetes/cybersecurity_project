export default () => {
  const defaultConfig = {
    timeout: 10,
    blackList: [ "eduroam" ],
    timeoutWEP: 120,
    timeoutWPA: 60,
    deauthDelay: 10,
    timeoutClient: 10,
    power: -85
  };

  return {
    state: {
      config: defaultConfig
    },
    mutations: {
      resetConfig(state) {
        state.config = defaultConfig;
      },
      setConfig(state, config) {
        state.config = config;
      },
    },
    getters: {
      config: (state) => {
        if(state.config == null) {
          return defaultConfig;
        }
        
        return state.config;
      },
    },
    actions: {
      setConfig(context, config) {
        context.commit('setConfig', config);
      }
    }
  }
}