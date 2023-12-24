import {createRouter,createWebHistory} from 'vue-router'


import LoginVue from '@/views/Login.vue'
import HomeVue from '@/views/home.vue'
import TestVue from '@/views/test.vue'
import BarVue from '@/views/bar.vue'
import ManageVue from '@/views/manage.vue'
import PostVue from '@/views/post.vue'
//定义路由关系
const routes = [
    {path:'/login',component:LoginVue,meta:{
        title:'登录'
    }},
    {path:'/',component:HomeVue,meta:{
        title:'SimpleForum'
    }},
    {path:'/bar',component:BarVue},
    {path:'/m',component:ManageVue,meta:{
        title:'管理页'
    }},
    {path:'/p/:postId',component:PostVue,meta:{
        title:'贴子'
    }}
]


//创建路由器
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

//调整页面标题
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
     document.title = to.meta.title
    }
     next()
})
//导出路由
export default router