<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { menus, MenuItem } from "./menu";
import { useRoute } from "vue-router";
</script>
<template>
  <div class="fixed top-headerH mt-5 flex flex-col">
    <template v-for="item in menus">
      <DFLink
        :to="item.router"
        class="inline-block w-32 h-9 text-sm font-bold  leading-9 px-2 mb-2  text-gray-700 dark:text-white hover:bg-white/80 hover:text-primary/80 transition-colors duration-200 cursor-pointer"
        >{{ item.name }}</DFLink
      >
    </template>
  </div>
</template>

<style lang="scss" scoped>
.link-active {
  background: #fff;
  color: hsl(var(--primary));
  border-radius: 4px;
}
</style>

<!-- 星火集（灵感捕捉器）
适合创意工作者快速记录灵光一现的模块，配以流星划过夜空的动态效果

情绪调色盘（情感管理站）
通过色彩选择记录心情波动的交互模块，生成专属心情色谱分析

时光胶囊（记忆存储器）
支持延时打开的日记功能，可设置3个月到3年不等的解封时间

脑洞工坊（创意孵化器）
思维导图+白板绘画的混合创作空间，支持多人实时协作涂鸦

回声谷（智能回溯站）
AI自动整理碎片化记录，生成可交互的时间轴故事地图

能量补给站（自我激励池）
用户自定义的励志内容库，结合成就系统解锁特殊鼓励彩蛋

平行宇宙（情景模拟器）
通过预设问题模板开启不同人生视角的角色扮演记录模式

量子速写（极简记录板）
三秒快速启动的极简输入界面，支持语音转文字+智能摘要生成 -->