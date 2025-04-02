<script setup lang='ts'>
import ItemSkeleton from './item-skeleton.vue';
import { Article } from '/@/interface/article';
import listItem from './list-item.vue';

interface ListPorps {
    articles: Article[],
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
            <template v-for="articleInfo in articles">
                <listItem :articleInfo="articleInfo" />
            </template>
        </template>
  </div>
</template>

<style lang='scss' scoped>

</style>