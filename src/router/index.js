import {createRouter,createWebHistory} from 'vue-router'


import LoginVue from '@/views/Login.vue'
import HomeVue from '@/views/home.vue'
import TestVue from '@/views/test.vue'
import BarVue from '@/views/bar.vue'


//定义路由关系
const routes = [
    {path:'/login',component:LoginVue},
    {path:'/',component:HomeVue},
    {path:'/bar',component:BarVue}
]


//创建路由器
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

//导出路由
export default router