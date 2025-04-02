<script setup lang="ts">
export interface ArticleInfoProps {
  id: string;
  picUrl: string;
  title: string;
  content: string;
}

const { articleInfo } = defineProps<{
  articleInfo: ArticleInfoProps;
}>();
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
      <p class="h-[30px] w-full">
        {{ articleInfo.content }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
