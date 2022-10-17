import { createStore } from 'vuex';

import axios from 'axios';

// Modules
import authModule from './auth';
import networksModule from './networks';
import configModule from './config';

const store = createStore({
  actions: { },
  modules: {
    auth: authModule(axios),
    networks: networksModule(axios),
    config: configModule()
  }
});

export default store;