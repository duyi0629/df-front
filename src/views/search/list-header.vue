<script setup lang='ts'>
const props = defineProps<{keyword: string}>()
</script>
<template>
  <div class="w-full overflow-hidden">
    <div class="h-[200px] w-full flex items-center justify-center bg-white">
        “{{keyword}}”的搜索结果如下
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>