<script setup lang="ts">
import { useStores } from '@/store'
import ArticleList from '@/components/list/index.vue'
import { ref } from 'vue';
import { Article } from '/@/interface/article';
import HeaderSwiper from './header-swiper.vue';

const {artilceList} = useStores()

console.log(artilceList.data, 'artilceList')

const fetching = ref(true)
const articles = ref<Article[]>([])

setTimeout(() => {
    fetching.value = false;
    articles.value = [
        {
            _id: '123',
            title: '123',
            content: '123'
        },
        {
            _id: '123',
            title: '123',
            content: '123'
        },
        {
            _id: '123',
            title: '123',
            content: ""
        },
        {
            _id: '123',
            title: '123',
            content: ""
        },
        {
            _id: '123',
            title: '123',
            content: ""
        },{
            _id: '123',
            title: '123',
            content: ""
        },{
            _id: '123',
            title: '123',
            content: ""
        }
    ]
}, 300);
</script>
<template>
  <div>
    <HeaderSwiper />
    <ArticleList :articles="articles" :fetching="fetching" />
  </div>
</template>

<style lang="scss" scoped></style>
