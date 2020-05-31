import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/replies/:threadId',
      name: 'replies',
      component: () => import('./views/Replies.vue')
    },
    {
      path: '/thread',
      name: 'thread',
      // lazy-loaded
      component: () => import('./views/Thread.vue')
    },
    {
      path: '/pm',
      name: 'pm',
      // lazy-loaded
      component: () => import('./views/Pm.vue')
    },
    {
      path: '/inbox',
      name: 'inbox',
      // lazy-loaded
      component: () => import('./views/Inbox.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  // const publicPages = ['/login', '/home', '/register', '/', '/replies', '/replies-*'];
  const privatePages = ['/profile', '/pm', '/thread', '/inbox'];
  // const authRequired = !publicPages.includes(to.path);
  const authRequired = privatePages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});