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
    <div class="flex-1">
      <p>
        {{ articleInfo.title }}
      </p>
      <p>
        {{ articleInfo.content }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
