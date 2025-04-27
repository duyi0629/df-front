<script setup>
import { ref } from 'vue'
import { MonacoEditor } from '@monaco-editor/vue'

const props = defineProps({
  code: String,
  runtime: String // 'javascript' | 'python'
})

const emit = defineEmits(['codeUpdated'])
const editorRef = ref(null)
const output = ref('')

const handleEditorMount = (editor) => {
  editorRef.value = editor
  editor.onDidChangeModelContent(() => {
    emit('codeUpdated', editor.getValue())
  })
}

const executeCode = async () => {
  try {
    // 使用 Web Worker 安全执行代码
    const worker = new Worker('./codeWorker.js')
    worker.postMessage({
      code: editorRef.value.getValue(),
      lang: props.runtime
    })

    worker.onmessage = (e) => {
      output.value = e.data.output
      worker.terminate()
    }
  } catch (err) {
    output.value = `Error: ${err.message}`
  }
}
</script>

<template>
  <div class="code-sandbox">
    <MonacoEditor
      :value="code"
      :language="runtime"
      theme="vs-dark"
      @mount="handleEditorMount"
    />
    
    <button @click="executeCode">运行</button>
    <div class="output-container">
      <pre>{{ output }}</pre>
    </div>
  </div>
</template>