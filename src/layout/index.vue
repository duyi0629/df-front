<script setup lang='ts'>
import AppHeader from './app-header.vue'
import AppNav from './app-nav/index.vue';
import Background from './background.vue';
import AppSidebar from './app-sidebar/index.vue'
import ScrollToTop from '@/components/common/ScrollToTop.vue'
</script>
<template>
  <div>
    <Background />
    <AppHeader/>
    <div class="w-[1050px] m-auto h-full pt-headerH ">
      <main class="flex w-full">
        <AppNav />
        <div class="content flex-1 ml-40 overflow-auto">
          <RouterView />
        </div>
        <AppSidebar />
      </main>
    </div>


    <ScrollToTop />
  </div>
</template>

<style lang='scss' scoped>

</style>