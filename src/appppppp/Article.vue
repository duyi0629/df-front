<script setup>
import { useSpeechSynthesis } from "@vueuse/core";
import { ref } from "vue";

const articleContent = ref("");
const currentSection = ref(0);
const sections = ref([]);

// 自动解析文章章节
const parseSections = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return Array.from(doc.querySelectorAll("h2")).map((h2) => ({
    id: h2.id,
    title: h2.textContent,
    content: h2.nextElementSibling?.textContent || "",
  }));
};

// 语音合成控制
const speech = useSpeechSynthesis();
const isPlaying = ref(false);

const playSection = (index) => {
  const text = sections.value[index].content;
  speech.speak({
    text,
    rate: 1.2,
    onEnd: () => {
      if (index < sections.value.length - 1) {
        playSection(index + 1);
      }
    },
  });
  isPlaying.value = true;
};

// 滚动同步
const handleScroll = () => {
  const scrollPos = window.scrollY;
  sections.value.forEach((section, index) => {
    const el = document.getElementById(section.id);
    if (el.offsetTop <= scrollPos + 100) {
      currentSection.value = index;
    }
  });
};
</script>

<template>
  <article @scroll.passive="handleScroll">
    <div v-html="articleContent" />

    <div class="audio-controls">
      <button @click="playSection(currentSection)">
        {{ isPlaying ? "暂停" : "播放本节" }}
      </button>
      <progress :value="currentSection + 1" :max="sections.length" />
    </div>
  </article>
</template>
