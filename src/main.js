import './assets/main.scss'

import { createApp } from 'vue'

import router from '@/router/index.js'
import App from './App.vue'
import ElementPlus from 'element-plus'
import {createPinia} from 'pinia'
import 'element-plus/dist/index.css'

const app = createApp(App);
const pinia  = createPinia();
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount('#app')

//vue项目的入口文件