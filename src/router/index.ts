import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import ArticleDetail from "@/views/article/index.vue";
import Observatorium from "@/views/observatorium/index.vue";
import MindPleat from "@/views/mind-pleat/index.vue";
import Search from "@/views/search/index.vue";
import { RouterName } from "./routerEnum";

const routes: RouteRecordRaw[] = [
  { path: "/", name: RouterName.Observatorium, component: Observatorium },
  { path: "/mind-pleat", name: RouterName.MindPleat, component: MindPleat },
  {
    path: "/search/:keyword",
    name: RouterName.Search,
    props: (to) => ({ keyword: to.params.keyword }),
    component: Search,
  },
  {
    path: "/article/:articleId",
    name: RouterName.Artilce,
    props: true,
    component: ArticleDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "link-active",
  routes,
});

export default router;
