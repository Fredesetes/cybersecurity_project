import { createRouter, createWebHashHistory } from 'vue-router';

import store from '../store';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../layouts/Auth.vue'),
    children: [
      {
        path: '',
        name: 'login.login',
        component: () => import('../pages/auth/Login.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../layouts/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'dashboard.dashboard',
        component: () => import('../pages/dashboard/Dashboard.vue')
      },
      {
        path: 'list',
        name: 'dashboard.list',
        component: () => import('../pages/dashboard/List.vue')
      },
      {
        path: 'create',
        name: 'dashboard.create',
        component: () => import('../pages/dashboard/Create.vue')
      },
      {
        path: 'import',
        name: 'dashboard.import',
        component: () => import('../pages/dashboard/Import.vue')
      },
      {
        path: 'edit',
        name: 'dashboard.edit',
        component: () => import('../pages/dashboard/Edit.vue')
      },
      {
        path: 'config',
        name: 'dashboard.config',
        component: () => import('../pages/dashboard/Config.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if(to.path == '/') {
    next({ name: 'login.login' });
    return;
  }

  // Not LoggedIn Routes:
  if(to.name == 'login') {
    next({ name: 'login.login' });
    return;
  }

  // Disallow Users to go to Dashboard
  if(to.name.includes('dashboard')) {
    if(store.state.auth.user) {
      next();
      return;
    }
    next({ name: 'login.login' });
    return;
  }

  next();
});

export default router;