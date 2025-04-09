<script setup lang="ts">

interface TagProp {
    _id: string,
    name: string,
}

const tags = [
  {
    _id: "_1",
    name: "vue",
  },
  {
    _id: "_2",
    name: "react",
  },
  {
    _id: "_3",
    name: "node",
  },
  {
    _id: "_4",
    name: "css",
  },
  {
    _id: "_5",
    name: "html",
  },
];

// click to find related articles
const handleTagClick = (tag: TagProp) => {

}
</script>
<template>
  <div class="p-2">
    <div class="bg-white px-3 py-2 rounded relative">
      <div class="border-b-[1px] dark:text-black">文章标签</div>
      <div class="mt-2">
        <span
          v-for="tag in tags"
          :key="tag._id"
          class="inline-block bg-slate-400 px-2 py-[2px] mr-2 rounded-sm mb-2 cursor-pointer"
          @click="handleTagClick(tag)"
          >{{ tag.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
