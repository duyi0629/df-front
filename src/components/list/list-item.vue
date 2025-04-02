<script setup lang="ts">
import { ref } from 'vue'
import { Article } from '/@/interface/article';


const { articleInfo } = defineProps<{
  articleInfo: Article;
}>();

const cnt = ref(articleInfo.content)
</script>
<template>
  <div class="bg-white mb-4 px-4 py-3 flex">
    <img src="" class="h-[100px] w-[150px]" />
    <div class="w-full flex flex-col ml-2">
      <p class="h-[30px] w-full mb-2">
        {{ articleInfo.title }}
      </p>
      <p class="h-[30px] w-full mb-2">
        {{ articleInfo.content }}
      </p>
      <p class="h-[30px] w-full" v-html="cnt">
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
