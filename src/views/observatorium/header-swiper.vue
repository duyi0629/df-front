<script setup lang="ts">
import { shallowRef, watch } from "vue";
import SwiperClass, { Swiper, SwiperSlide } from "@/components/common/swiper";

const props = defineProps({
  swiperImgList: {
    type: Array as () => string[],
    required: true,
  },
});

// 调试输出
watch(
  () => props.swiperImgList,
  (newValue) => {
    console.log(newValue, "props.swiperImgList");
  }
);

const INITIAL_SLIDE_INDEX = 0;
const swiperRef = shallowRef<SwiperClass>();
const activeSlideIndex = shallowRef(INITIAL_SLIDE_INDEX);
const setSwiper = (_swiper: SwiperClass) => {
  swiperRef.value = _swiper;
};

const updateActiveIndexChange = () => {
  if (swiperRef.value) {
    // console.log(swiperRef.value.realIndex, swiperRef.value, "swiperRef.value");
    activeSlideIndex.value = swiperRef.value.realIndex;
  }
};

const goToSlide = (index: number) => {
  if (swiperRef.value) {
    swiperRef.value.slideToLoop(index);
  }
};

</script>
<template>
  <div class="w-full overflow-hidden">
    <!-- 显示 props.swiperImgList -->
    <swiper
      class="swiper"
      :style="{ '--slide-delay': `${3000}ms` }"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :loop="true"
      :mousewheel="true"
      :set-wrapper-size="true"
      :observe-parents="true"
      :grab-cursor="false"
      :simulate-touch="false"
      :initial-slide="INITIAL_SLIDE_INDEX"
      @slide-change="updateActiveIndexChange"
      @swiper="setSwiper"
    >
      <!-- 使用 props.swiperImgList -->
      <swiper-slide
        v-for="(img, index) in swiperImgList.slice(0, 10)"
        :key="index"
      >
        <img :src="img" class="w-full h-full object-cover object-center" />
      </swiper-slide>
      <template #container-end>
        <div class="swiper-pagitataion">
          <!-- 修正 v-for 循环，使用 props.swiperImgList 的长度 -->
          <template
            v-for="(item, index) in swiperImgList.slice(0, 10)"
            :key="index"
          >
            <div
              class="pagitation-item"
              :class="{ active: index === activeSlideIndex }"
              @click="goToSlide(index)"
            >
              <span class="progress"></span>
            </div>
          </template>
        </div>
      </template>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.swiper {
  height: 200px;
  width: 100%;
}

.swiper-pagitataion {
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 99;
}

.swiper-pagitataion .pagitation-item {
  width: 10px;
  height: 10px;
  margin-right: 10px;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  position: relative;
  border-radius: 50%;
}

.swiper-pagitataion .pagitation-item .progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  clip-path: circle(0% at 50% 50%);
  border-radius: 50%;
}

.swiper-pagitataion .active {
  width: 10px; /* 修正宽度值，添加单位 */
}

.swiper-pagitataion .active .progress {
  animation: circularProgress var(--slide-delay) linear forwards;
}

@keyframes circularProgress {
  0% {
    clip-path: circle(0% at 50% 50%);
  }
  100% {
    clip-path: circle(50% at 50% 50%);
  }
}
     
</style>
