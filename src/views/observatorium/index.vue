<script setup lang="ts">
import { useStores } from "@/store";
import ArticleList from "@/components/list/index.vue";
import { onMounted, ref, watch, computed } from "vue";
import { Article } from "/@/interface/article";
import HeaderSwiper from "./header-swiper.vue";
import Loadmore from "/@/components/common/loadmore.vue";
const { artilceList: articleListStore } = useStores();
const dataLoaded = ref(false)

onMounted(async () => {
  dataLoaded.value = true
  articleListStore.fetch({}).then(res => {
    dataLoaded.value = true
  }).catch((error) => {
    
    console.log(error, "获取文章列表数据失败", error);
  });
});

const onLoadMore = () => {
  const pagination = articleListStore.pagination || {pageNum: 1, pageSize: 10};
  articleListStore
    .fetch({ pageNum: pagination.pageNum + 1, pageSize: pagination.pageSize })
    .catch((error) => {
      console.log(error, "获取文章列表数据失败", error);
    });
};


const swiperImgList = computed(() => {
  if (dataLoaded.value && articleListStore.data.length > 0) {
    return articleListStore.data.slice(0, 10).map((item: Article) => item.cover_image);
  }
  return [];
});
  // console.log(swiperImgList, 'swiperImgList')

</script>
<template>
  <div>
    <HeaderSwiper :swiperImgList="swiperImgList" />
    <ArticleList :articles="articleListStore.data" :fetching="articleListStore.fetching" :pagination="articleListStore.pagination" />
    <Loadmore :pagination="articleListStore.pagination" @onLoadMore="onLoadMore" />
  </div>
</template>

<style lang="scss" scoped></style>
