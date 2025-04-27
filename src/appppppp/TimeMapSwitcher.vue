<script setup>
import { useKnowledgeGraphStore } from '@/stores/knowledgeGraph'
import { defineAsyncComponent, ref } from 'vue'

const store = useKnowledgeGraphStore()
const modes = ['galaxy', 'timeline', 'mindmap']
const currentMode = ref('galaxy')

// 动态组件切换
const componentMap = {
  galaxy: defineAsyncComponent(() => import('./GalaxyView.vue')),
  timeline: defineAsyncComponent(() => import('./TimeLine.vue')),
  mindmap: defineAsyncComponent(() => import('./MindMap.vue'))
}

const handleTransform = (newMode) => {
  // 执行视图切换动画
  const oldView = document.getElementById('view-container')
  oldView.style.transform = `scale(0.8) opacity(0)`
  
  setTimeout(() => {
    currentMode.value = newMode
    store.setViewMode(newMode)
    nextTick(() => {
      const newView = document.getElementById('view-container')
      newView.style.transform = 'scale(1) opacity(1)'
    })
  }, 300)
}
</script>

<template>
  <div class="view-switcher">
    <button 
      v-for="mode in modes"
      :key="mode"
      @click="handleTransform(mode)"
      :class="{ active: currentMode === mode }"
    >
      {{ mode }}
    </button>
    
    <Transition name="view-transition">
      <component 
        :is="componentMap[currentMode]" 
        :nodes="store.nodes"
        id="view-container"
      />
    </Transition>
  </div>
</template>

<style>
.view-transition-enter-active,
.view-transition-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.view-transition-enter-from,
.view-transition-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>