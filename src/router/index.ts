import { createRouter, createWebHistory } from "vue-router";
import ArticleDetail from "@/views/article/index.vue";
import Observatorium from "@/views/observatorium/index.vue";
import MindPleat from '@/views/mind-pleat/index.vue'
import { RouterName } from "./routerEnum";

const routes = [
  { path: "/", name: RouterName.Observatorium, component: Observatorium },
  { path: "/mind-pleat", name: RouterName.MindPleat, component: MindPleat },
  { path: "/article/:articleId", name: RouterName.Artilce, component: ArticleDetail },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "link-active",
  routes,
});

export default router;
