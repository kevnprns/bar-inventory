import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Bartender from './views/Bartender.vue';
import Barback from './views/Barback.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/readme',
      name: 'readme',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ReadMe.vue'),
    },
    {
      path: '/bartender',
      name: 'bartender',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Bartender,
    },
    {
      path: '/barback',
      name: 'barback',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Barback,
    },
  ],
});
