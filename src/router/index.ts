import { createRouter, createWebHistory } from 'vue-router';
import BlackJackVue from '../pages/black-jack-game/BlackJack.vue';
import TopPage from '../pages/TopPage.vue';
import BlackJackHistoryVue from '../pages/black-jack-history/BlackJackHistory.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: TopPage,
  },
  {
    path: '/black-jack',
    name: 'blackJackPage',
    component: BlackJackVue,
  },
  {
    path: '/black-jack-history',
    name: 'blackJackHistoryPage',
    component: BlackJackHistoryVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
