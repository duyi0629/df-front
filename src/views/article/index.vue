<script setup lang="ts">
import { ref } from "vue";
import ArticleItem, { ArticleInfoProps } from "./c-cpn/article-item.vue";
import ArticleSkeleton from "./c-cpn/article-skeleton.vue";
import ArticleSwiper from "./c-cpn/article-swiper.vue";
// 定义文章数据
let data = ref<ArticleInfoProps[]>([]);

// 定义骨架屏展示
const showSkeleton = ref(true);

const fetchData = async () => {
  try {
    await new Promise((resolve, reject) => setTimeout(resolve, 300));
    showSkeleton.value = false;
    data.value = [
      {
        id: "1",
        picUrl: "2",
        title: "3",
        content: "4",
      },
      {
        id: "11",
        picUrl: "21",
        title: "31",
        content: "41",
      },
      {
        id: "112",
        picUrl: "212",
        title: "312",
        content: "412",
      },
    ];
  } catch (error) {}
};

fetchData();
</script>
<template>
  <div v-if="!showSkeleton" class="mx-3 mt-3">
    <ArticleSwiper class=" mb-4" />
    <div v-for="articleInfo in data" :key="articleInfo.id">
      <ArticleItem :articleInfo="articleInfo" />
    </div>
  </div>
  <ArticleSkeleton v-else />
</template>

<style lang="scss" scoped></style>
