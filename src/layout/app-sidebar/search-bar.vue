<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { watch } from "fs";
import { Search } from 'lucide-vue-next'
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const router  = useRouter()
const searchkeyword = ref('')
function handleSearch(){
  const keyword = searchkeyword.value
  if(keyword.trim() === '') return
  router.push(`/search/${keyword}`)
  searchkeyword.value = '';
}

watchEffect(() => {
  console.log(router, 'router')
})  
</script>
<template>
  <div class="p-2">
    <div class="bg-white px-3 py-2 rounded relative ">
      <Input id="article-key" v-model="searchkeyword" type="text" placeholder="想你所想" />
      <span class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer  border-x px-3 py-1 rounded-r-sm" @click="handleSearch">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
