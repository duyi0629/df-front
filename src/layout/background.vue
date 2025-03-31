<script setup lang="ts"></script>
<template>
  <div id="background">
    <div class="image"></div>
  </div>
</template>

<style lang="scss" scoped>
#background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* background-color: rgb(128, 128, 128, .3); */
  z-index: -1;
  .image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.3;
    background: url("@/assets/page_bg4.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
