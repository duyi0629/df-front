<script setup lang="ts">
import { shallowRef } from 'vue'
import SwiperClass, { Swiper, SwiperSlide } from "@/components/common/swiper"

const INITIAL_SLIDE_INDEX = 0
const swiperRef = shallowRef<SwiperClass>()
const activeSlideIndex = shallowRef(INITIAL_SLIDE_INDEX)
const setSwiper = (_swiper: SwiperClass) => {
  swiperRef.value = _swiper
}

const updateActiveIndexChange = () => {
  if (swiperRef.value) {
    console.log(swiperRef.value.realIndex, swiperRef.value, 'swiperRef.value')
    activeSlideIndex.value = swiperRef.value.realIndex
  }
}

const goToSlide = (index: number) => {
  if (swiperRef.value) {
    swiperRef.value.slideToLoop(index)
  }
}
</script>
<template>
  <div class="w-full overflow-hidden">
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
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide>
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide>
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide>
      <template #container-end>
        <div class="swiper-pagitataion">
          <template v-for="(item, index) in 3" :key="item">
            <div
              class="pagitation-item"
              :class="{ active: index == activeSlideIndex }"
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
  .pagitation-item {
    width: 10px;
    height: 10px;
    margin-right: 10px;
    background-color: rgba(white, 0.4);
    cursor: pointer;
    .progress {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(white, 0.7);
      transform-origin: left;
      transform: scaleX(0);
    }
  }
  .active {
    width: 20px;
    position: relative;
    .progress {
      animation: identifier var(--slide-delay) linear forwards;
      @keyframes identifier {
        0% {
          transform: scaleX(0);
        }
        100% {
          transform: scaleX(1);
        }
      }
    }
  }
}
</style>
