import { createApp } from 'vue'
import './style.css'
import '@/styles/global.scss'
import App from './App.vue'
import components from '@/components/components'


const app = createApp(App);

// 注册全局组件
app.use(components)

// 挂载应用
app.mount('#app');
