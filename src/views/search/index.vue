<script setup lang="ts">
import { useStores } from '@/store'
import ArticleList from '@/components/list/index.vue'
import { onMounted, ref, watch, watchEffect } from 'vue';
import Loadmore from '/@/components/common/loadmore.vue';
import ListHeader from './list-header.vue';

const {artilceList: articleListStore  } = useStores()


const props = defineProps<{keyword: string}>()


watchEffect(() => {
  const keyword = props.keyword
  articleListStore.fetch({keyword})
})

onMounted(async () => {
    articleListStore.fetch({keyword: props.keyword}).catch((error) => {
        console.log(error, '获取文章列表数据失败', error)
    })
})


const onLoadMore = () => {
  const pagination = articleListStore.pagination;
  articleListStore.fetch({keyword: props.keyword, pageNum: pagination!.pageNum + 1}).catch((error) => {
        console.log(error, '获取文章列表数据失败', error)
  })
}

</script>
<template>
  <div>
    <ListHeader :keyword="keyword" />
    <ArticleList :articles="articleListStore.data" :fetching="articleListStore.fetching" :pagination="articleListStore.pagination" />
    <Loadmore :pagination="articleListStore.pagination" @onLoadMore="onLoadMore" />
  </div>
</template>

<style lang="scss" scoped></style>
