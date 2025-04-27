<script setup lang="ts">
import { onMounted } from 'vue'
import MarkdownViewer from "@/components/common/markdown/index.vue";
import { useStores } from "/@/store";
import { useRoute, useRouter } from 'vue-router';
const { artilceDetail: artilceDetailStore } = useStores()
const props = defineProps<{
  articleId: String
  }>()
onMounted( async () => {
  const route = useRoute()
  const router = useRouter()

  console.log(route, router, 1, props,  'route')
  artilceDetailStore.fetchArticleDetail(props.articleId).catch((error) => {
        console.log(error, '获取文章详情数据失败', error)
    })
})

</script>
<template>
  <div class="article-detail bg-white px-4 mx-3">
    <p class="text-3xl text-center">ssssss</p>
    <div>aaaaaaaaaaa</div>
    <MarkdownViewer
      :content="artilceDetailStore.article?.content"
      :allow-html="false"
      :sanitize-options="{
        ALLOWED_TAGS: ['h1', 'h2', 'p', 'a', 'img'],
        ALLOWED_ATTR: ['href', 'src', 'alt'],
      }"
    />
  </div>
</template>

<style lang="scss" scoped></style>
