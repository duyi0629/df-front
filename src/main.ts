import { createApp } from 'vue'
import './style.css'
import '@/styles/global.scss'
import '@/components/common/swiper/style'
import App from './App.vue'
import components from '@/components/components'
import router from '@/router/index'
import { createStore } from "@/store"

const store = createStore()

const app = createApp(App);

// 注册全局组件
app.use(components)
app.use(store)
app.use(router)

// 挂载应用
app.mount('#app');
