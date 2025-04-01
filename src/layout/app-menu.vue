<script setup lang="ts">
import { ref } from 'vue';


const activeItem = ref(1)

const handleClick = (itemIndex: number) => {
  activeItem.value = itemIndex
}
</script>
<template>
  <div class="fixed top-headerH mt-5">
    <div
      v-for="item in 7"
      class=" w-32 h-9 leading-9 px-2 mb-2 hover:bg-white/60 hover:text-primary/60  transition-colors duration-200 cursor-pointer"
      :class="{ 'bg-white text-primary': activeItem === item }"
      @click="handleClick(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
