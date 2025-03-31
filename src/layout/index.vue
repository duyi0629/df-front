<script setup lang='ts'>
import AppHeader from './app-header.vue'
import AppMenu from './app-menu.vue';
import Background from './background.vue';
</script>
<template>
  <div class="w-[1050px] m-auto h-full bg-black pt-headerH">
    <Background />
    <AppHeader/>
    <AppMenu />
    <main class="">
      111
      <h1 v-for="h in 1">111</h1>
    </main>
  </div>
</template>

<style lang='scss' scoped>

</style>