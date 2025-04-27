<template>
     
  <div class="image-container"  v-bind="$attrs">
    <!-- :class="{ hidden: isLoaded }" -->
    <div class="placeholder" :class="{ placeholder_hidden: isLoaded }"></div>
    <img
      :src="useImg"
      class="image"
      :class="{ loaded: isLoaded }"
      :alt="alt"
      width="80px"
      height="40px"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, computed } from "vue";

// 定义组件的 props
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
});

const isLoaded = ref(false);
const source = ref("");

onMounted(() => {
  const img = new Image();
  img.src = props.src;
  img.onload = () => {
    source.value = props.src;
    isLoaded.value = true;
  };
  // 增加错误处理逻辑
  img.onerror = () => {
    console.error(`Failed to load image: ${props.src}`);
  };
});

const useImg = computed(() => {
  return source.value || props.src;
});

// 监听 props.src 的变化
watchEffect(() => {
  isLoaded.value = false;
  const img = new Image();
  img.src = props.src;
  img.onload = () => {
    source.value = props.src;
    isLoaded.value = true;
  };
  img.onerror = () => {
    console.error(`Failed to load image: ${props.src}`);
  };
});
</script>

<style scoped>
.image-container {
  position: relative;
  /* padding-top: 56.25%; */
  overflow: hidden;
}

.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eee;
  z-index: 2;
  /* transition: height 0.5s ease; */
  transform: translateY(0);
  transition: all .6s cubic-bezier(0.4, 0, 0.2, 1);
}

.placeholder_hidden{
  transform: translateY(100%);
  z-index: 99;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* transform: translateY(100%); */
  opacity: 0;
}

.image.loaded {
  opacity: 1;
}
</style>    