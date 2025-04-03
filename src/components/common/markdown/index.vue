<template>
    <div class="markdown-container">
      <div class="rendered-content" v-html="safeContent"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
  import MarkdownIt from 'markdown-it'
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'
  import html from 'highlight.js/lib/languages/xml'
  import DOMPurify from 'dompurify'
  
  // 按需注册语言
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('html', html)
  
  const props = defineProps({
    content: {
      type: String,
      required: true
    },
    allowHtml: {
      type: Boolean,
      default: false
    },
    highlight: {
      type: Boolean,
      default: true
    },
    sanitizeOptions: {
      type: Object,
      default: () => ({
        ALLOWED_TAGS: ['h1', 'h2', 'h3', /* 其他允许的标签 */],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'class']
      })
    }
  })
  
  // 安全配置的 Markdown 解析器
  const md = new MarkdownIt({
    html: props.allowHtml,  // 根据配置决定是否允许 HTML
    linkify: true,
    breaks: true,
    highlight: props.highlight ? highlightCode : null
  })
  
  // 高亮处理器
  function highlightCode(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { 
          language: lang,
          ignoreIllegals: true
        }).value}</code></pre>`
      } catch (e) {
        console.warn('Code highlight error:', e)
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
  
  // 安全内容处理
  const safeContent = ref('')
  let sanitizerCleanup = null
  
  const processContent = async (raw) => {
    try {
      // 分阶段处理：Markdown 转换 -> 安全过滤 -> 后处理
      const rendered = md.render(raw)
      
      // 使用 DOMPurify 进行严格过滤
      const sanitized = DOMPurify.sanitize(rendered, {
        ...props.sanitizeOptions,
        RETURN_TRUSTED_TYPE: true,
        FORBID_CONTENTS: ['script', 'iframe', 'object'],
        ADD_ATTR: ['target'],  // 允许特定属性
        ADD_URI_SAFE_ATTR: ['src', 'href']
      })
      
      // 后处理：安全地添加 rel 属性
      const processed = await postProcessContent(sanitized.toString())
      
      return processed
    } catch (e) {
      console.error('Content processing error:', e)
      return '⚠️ 内容解析失败'
    }
  }
  
  // 安全的后处理
  async function postProcessContent(html) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    // 处理外部链接
    doc.querySelectorAll('a').forEach(a => {
      if (isExternalLink(a.href)) {
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', 'noopener noreferrer')
      }
    })
    
    // 处理图片安全
    doc.querySelectorAll('img').forEach(img => {
      img.setAttribute('loading', 'lazy')
      if (!isSafeSource(img.src)) {
        img.removeAttribute('src')
      }
    })
    
    return doc.body.innerHTML
  }
  
  // 安全检测方法
  function isExternalLink(url) {
    try {
      const origin = new URL(url).origin
      return origin !== window.location.origin
    } catch {
      return false
    }
  }
  
  function isSafeSource(src) {
    const allowedProtocols = ['http:', 'https:', 'data:']
    try {
      const url = new URL(src)
      return allowedProtocols.includes(url.protocol)
    } catch {
      return false
    }
  }
  
  // 防抖处理
  let processQueue = null
  watch(() => props.content, async (newVal) => {
    clearTimeout(processQueue)
    processQueue = setTimeout(async () => {
      safeContent.value = await processContent(newVal)
    }, 200)
  }, { immediate: true })
  
  onBeforeUnmount(() => {
    clearTimeout(processQueue)
    sanitizerCleanup?.()
  })
  </script>
  
  <style>
  /* 添加安全相关的样式限制 */
  .rendered-content :deep() img {
    max-width: 100%;
    height: auto;
  }
  
  .rendered-content :deep() iframe {
    display: none; /* 完全禁止 iframe */
  }
  
  .rendered-content :deep() script {
    display: none !important;
  }
  .rendered-content {
      font-family: cursive;
    }

  .rendered-content p {
    text-indent: 2em;
    line-height: 2.2em;
  }

  </style>