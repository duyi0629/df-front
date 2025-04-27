import { Pagination } from './../interface/commom';
import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import DFRequest from "../service";
import { Article } from "../interface/article";

const ARTICLE_API_PATH = "/article";

export const useArticleListStore = defineStore("article", () => {
  const fetching = ref(false);
  const data = ref<Article[]>([]); // 使用 ref 替代 shallowRef
  const pagination = shallowRef<Pagination | null>(null);

  const fetch = async (params: $TODO = {}) => {
    const isFirstPage = !params.pageNum || params.pageNum === 1;
    const isLoadMore = !isFirstPage && params.pageNum! > 1;

    if (isFirstPage) {
      data.value = [];
      pagination.value = null;
    }

    fetching.value = true;
    try {
      const res = await DFRequest.get({ url: `${ARTICLE_API_PATH}/list`, params });
      if (res.code === 200) {
        if (isLoadMore) {
          data.value.push(...res.data); // 自动触发响应式更新
        } else {
          data.value = res.data;
        }
        pagination.value = res.pageInfo;
      }
    } catch (error) {
      console.error("请求失败:", error);
    } finally {
      fetching.value = false;
    }
  };

  return { fetch, data, pagination, fetching };
});


export const useArticleDetailStore = defineStore("articleDetail", () => {
  const fetching = ref(false);
  const article = ref<Article | null>(null);
  const preArticle = shallowRef<Article | null>(null);
  const nextArticle = shallowRef<Article | null>(null);

  const fetchArticleDetail = async (articleId: String) => {
    article.value = null;
    fetching.value = true;
    const res = await DFRequest.get({
      url: `${ARTICLE_API_PATH}/${articleId}`,
    });
    article.value = res.data;
    fetching.value = false;
  };

  return {
    fetching,
    article,
    fetchArticleDetail,
  };
});


