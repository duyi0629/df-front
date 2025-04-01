<!-- 骨架屏 -->
<script setup lang="ts">
import { cn } from "/@/lib/utils";

const props = defineProps({
  class: {
    type: String,
    default: "w-6 h-6 ",
  },
});
</script>
<template>
  <div :class="cn('animation-aa bg-gray-400 rounded-md', props.class)"></div>
</template>

<style lang="scss" scoped>
.animation-aa {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
</style>
