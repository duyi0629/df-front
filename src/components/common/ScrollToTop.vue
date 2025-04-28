<script setup lang='ts'>
import { ref } from 'vue';

const scrollInfo = ref(0)

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    scrollInfo.value = scrollTop;
});


const handleScroll = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>
<template>
  <div class="fixed bottom-40 right-40 w-8 h-8 bg-white leading-8 text-center animate-in cursor-pointer" v-show="scrollInfo > 0" @click="handleScroll">
    <span class="inline-block -rotate-90">></span>
  </div>
</template>

<style lang='scss' scoped>

</style>