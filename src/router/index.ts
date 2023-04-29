import { createRouter, createWebHistory } from 'vue-router';
import BrackJackVue from '../pages/BrackJack.vue';
import TopPage from '../pages/TopPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: TopPage,
  },
  {
    path: '/brack-jack',
    name: 'brackJacePage',
    component: BrackJackVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
