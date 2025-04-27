<script setup lang='ts'>
import ItemSkeleton from './item-skeleton.vue';
import { Article } from '/@/interface/article';
import listItem from './list-item.vue';
import { Pagination } from '/@/interface/commom';

interface ListPorps {
    articles: Article[],
    pagination: Pagination | null
    fetching: Boolean
}

const props = defineProps<ListPorps>()
</script>
<template>
  <div class="mt-5"> 
        <!-- loading -->
        <template v-if="!articles.length && fetching ">
            <template v-for="item in 7">
                <ItemSkeleton />
            </template>
        </template>
        <!-- empty -->
        <template v-if="!articles.length && !fetching ">
            <div class="text-center h-52 leading-[200px] bg-white text-gray-700">
                没有了喔
            </div>
        </template>
        <!-- list -->
        <template v-if="articles.length && !fetching ">
            <div v-for="(articleInfo, index) in articles"  :key="articleInfo._id" :id="articleInfo._id">
                    <listItem :articleInfo="articleInfo" />
            </div>
        </template>
  </div>
</template>

<style lang='scss' scoped>

</style>