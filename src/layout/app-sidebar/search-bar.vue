<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-vue-next'

function handleSearch(){

}
</script>
<template>
  <div class=" bg-white px-3 py-2 rounded relative ">
    <Input id="article-key" type="text" placeholder="请输入" />
    <span class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer  border-x px-3 py-1 rounded-r-sm" @click="handleSearch">
      <Search class="size-6 text-muted-foreground" />
    </span>
    
  </div>
</template>

<style lang="scss" scoped></style>
