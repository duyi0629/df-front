<script setup lang="ts">
import ThemeToggle from "@/components/theme-toggle.vue";
</script>
<template>
  <div
    class="fixed z-[9999] app-header text-center left-0 h-headerH leading-10 border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    你要明白， 你是独一无二的， 在你的主场， 你就是主角。

    <ThemeToggle />
  </div>
</template>

<style lang="scss" scoped></style>
