import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

import { Dialog, Notify, Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

import axios from 'axios';
import VueApexCharts from "vue3-apexcharts";

const apiDomain = import.meta.env.VITE_API_DOMAIN_DEV;
axios.defaults.baseURL = apiDomain;

const app = createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router)
  .use(VueApexCharts);

app.config.globalProperties.$dialog = Dialog;
app.config.globalProperties.$notify = Notify;
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$server = apiDomain;

app.mount('#app');
