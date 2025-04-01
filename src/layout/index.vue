<script setup lang='ts'>
import AppHeader from './app-header.vue'
import AppMenu from './app-menu.vue';
import Background from './background.vue';
import AppSidebar from './app-sidebar/index.vue'
import ArticleList from '@/views/article-list/index.vue'
</script>
<template>
  <div>
    <Background />
    <AppHeader/>
    <div class="w-[1050px] m-auto h-full pt-headerH ">
      <main class="flex">
        <AppMenu />
        <div class="content flex-1 pl-40">
          <ArticleList />
        </div>
        <AppSidebar />
      </main>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>