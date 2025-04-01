<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useColorMode, BasicColorMode } from "@vueuse/core";

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode();

function handleClick(type: BasicColorMode) {
  mode.value = type;
  console.log(type, 'variant="outline"');
}
</script>

<template>
  <div class="fixed right-10 top-3 inline-block">
    <Icon
      @click="handleClick('dark')"
      icon="radix-icons:moon"
      class="h-[1.2rem] w-[1.2rem]  transition-all"
      v-show="mode === 'light'"
    />
    <Icon
      @click="handleClick('light')"
      icon="radix-icons:sun"
      class="h-[1.2rem] w-[1.2rem]  transition-all"
      v-show="mode === 'dark'"
    />
  </div>
</template>
