import { createRouter, createWebHistory } from "vue-router";
import BrackJackVue from "../pages/BrackJack.vue";
import HomePage from "../pages/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/brack-jack",
    name: "brackJacePage",
    component: BrackJackVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
