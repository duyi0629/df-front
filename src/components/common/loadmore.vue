<script setup lang="ts">
import { computed } from "vue";
import { Pagination } from "/@/interface/commom";

const { pagination } = defineProps<{
  pagination: Pagination | null;
}>();

const loadNum = computed(() => {
  if (!pagination) return 0;
  const num = pagination?.pageNum * pagination?.pageSize;
  return num > pagination?.totalCount ? pagination?.totalCount : num;
});

const hasMoreArticle = computed(() => {
  if (!pagination) return false;
  return pagination!.pageNum * pagination!.pageSize < pagination!.totalCount;
});

const emits = defineEmits(["onLoadMore"]);
// loadMore
const loadMore = () => {
  if (!hasMoreArticle.value) return;
  emits("onLoadMore");
};
</script>
<template>
  <div v-if="!pagination"></div>
  <div class="flex items-center h-9 bg-white leading-9 pl-4 overflow-hidden" v-else>
    <div class="h-full flex-1">{{ loadNum }}/{{ pagination?.totalCount }}</div>
    <div
      @click="loadMore"
      :class="{ 'cursor-not-allowed': !hasMoreArticle }"
      class="w-24 h-full cursor-pointer hover:text-white hover:bg-primary text-center"
    >
      {{ hasMoreArticle ? "加载更多" : "已到底" }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
