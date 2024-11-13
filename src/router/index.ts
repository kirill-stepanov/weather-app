import { createRouter, createWebHistory } from "vue-router";

import { appRouters } from "@/constants";

import HomeView from "@/views/HomeView.vue";
import FavoriteView from "@/views/FavoriteView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: appRouters.HOME,
      name: "home",
      component: HomeView,
    },
    {
      path: appRouters.FAVORITE,
      name: "favorite",
      component: FavoriteView,
    },
  ],
});

export default router;
