import './assets/main.scss'

import { createApp } from 'vue'

import router from '@/router/index.js'
import App from './App.vue'
import Avatar from "@/components/Avatar.vue"
import DataList from "@/components/DataList.vue"
import UserInfo from "@/components/UserInfo.vue"
import CommentListItem from '@/components/CommentListItem.vue'
import ElementPlus from 'element-plus'
import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-persistedstate-plugin'
import 'element-plus/dist/index.css'

const app = createApp(App);
const pinia  = createPinia();
const persist = createPersistedState();
pinia.use(persist)

app.config.globalProperties.globalInfo={
    bodyWidth:1300,
    avatarUrl:'/file/getAvatar'
}

app.use(router);
app.use(pinia);
app.use(ElementPlus);

app.component("Avatar",Avatar);
app.component("UserInfo",UserInfo);
app.component("DataList",DataList)
app.component("CommentListItem",CommentListItem)
app.mount('#app');

//vue项目的入口文件