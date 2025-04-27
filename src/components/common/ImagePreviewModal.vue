<template>
  <div>
    <button @click="showModal = true">打开图片预览</button>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>图片预览</h2>
        <div class="image-preview-wrapper">
          <!-- 左切换按钮 -->
          <button
            v-if="images.length > 1"
            @click="prevImage"
            class="switch-button"
          >
            &lt;
          </button>
          <!-- 显示当前预览的大图片 -->
          <dfImg
            :src="currentImage"
            :width="300"
            alt="Preview"
            class="h-[400px] w-[700px]"
          />
          <!-- 右切换按钮 -->
          <button
            v-if="images.length > 1"
            @click="nextImage"
            class="switch-button"
          >
            &gt;
          </button>
        </div>
        <div
          class="dot-container absolute bottom-6 left-1/2 -translate-x-1/2 flex"
          v-if="bottomType === 'dot'"
        >
          <template v-for="(image, index) in images">
            <div
              class="w-2 h-2 rounded-full bg-white mr-1 cursor-pointer relative overflow-hidden"
              :class="{ 'dot-active ': index === currentIndex }"
              @click="handleThumbnailClick(index)"
            >
            <div class="dot w-full h-full rounded-full bg-white  absolute top-0 left-0" :class="{ 'dot_mask bg-black': index === currentIndex }"></div>
          </div>
          </template>
        </div>
        <div
          ref="thumbnailContainer"
          class="thumbnail-container"
          v-if="bottomType === 'picture'"
        >
          <!-- 显示所有小图片，使用懒加载 -->
          <dfImg
            v-for="(image, index) in images"
            :key="index"
            :data-src="image"
            :width="80"
            :height="80"
            :style="{
              border: index === currentIndex ? '2px solid #1890ff' : 'none',
            }"
            class="h-20 w-36"
            :src="image"
            @click="handleThumbnailClick(index)"
            alt="Thumbnail"
            loading="lazy"
            ref="thumbnailImages"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed, Ref } from "vue";
import dfImg from "./df-img/df-img.vue";

type BottomType = "dot" | "picture";

// 定义 props 的类型
const props = withDefaults(
  defineProps<{
    images: string[];
    bottomType: BottomType;
  }>(),
  {
    bottomType: "dot",
  }
);

const showModal: Ref<boolean> = ref(false);
const currentIndex: Ref<number> = ref(0);
const thumbnailContainer: Ref<HTMLElement | null> = ref(null);
const thumbnailImages: Ref<HTMLImageElement[]> = ref([]);

const currentImage = computed(() => props.images[currentIndex.value]);

const handleThumbnailClick = (index: number) => {
  currentIndex.value = index;
  scrollToCurrentThumbnail();
};

const prevImage = () => {
  currentIndex.value =
    currentIndex.value > 0 ? currentIndex.value - 1 : props.images.length - 1;
  scrollToCurrentThumbnail();
};

const nextImage = () => {
  currentIndex.value =
    currentIndex.value < props.images.length - 1 ? currentIndex.value + 1 : 0;
  scrollToCurrentThumbnail();
};

const scrollToCurrentThumbnail = () => {
  const container = thumbnailContainer.value;
  if (container) {
    const thumbnail = container.children[currentIndex.value] as HTMLElement;
    if (thumbnail) {
      const thumbnailRect = thumbnail.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (thumbnailRect.left < containerRect.left) {
        container.scrollLeft -= containerRect.left - thumbnailRect.left;
      } else if (thumbnailRect.right > containerRect.right) {
        container.scrollLeft += thumbnailRect.right - containerRect.right;
      }
    }
  }
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src as string;
        observer.unobserve(img);
      }
    });
  });

  thumbnailImages.value.forEach((img) => {
    observer.observe(img);
  });
});

watch(
  () => props.images,
  () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src as string;
          observer.unobserve(img);
        }
      });
    });

    thumbnailImages.value.forEach((img) => {
      observer.observe(img);
    });
  },
  { deep: true }
);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 700px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.image-preview-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.switch-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.switch-button:first-of-type {
  left: 10px;
}

.switch-button:last-of-type {
  right: 10px;
}

.thumbnail-container {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #ccc #f0f0f0;
}

.thumbnail-container::-webkit-scrollbar {
  height: 8px;
}

.thumbnail-container::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.thumbnail-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

/* .dot-active {
  transition: all 1s ease;
  transform: translateX(100%);
 
} */

.dot {
  opacity: 0;
  transform: translateX(-100%);

}
.dot_mask {
  transition: all 1s ease;
  transform: translateX(0%);
  opacity: 1;
}
</style>
