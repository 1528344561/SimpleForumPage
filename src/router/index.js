import {createRouter,createWebHistory} from 'vue-router'


import LoginVue from '@/views/Login.vue'
import HomeVue from '@/views/home.vue'
import TestVue from '@/views/test.vue'
import BarVue from '@/views/bar.vue'
import ManageVue from '@/views/manage.vue'
import PostVue from '@/views/post.vue'
import UserVue from '@/views/user.vue'
import IVue from '@/views/i.vue'
//定义路由关系
const routes = [
    {path:'/login',component:LoginVue,meta:{
        title:'登录 - 欢迎你来探索更多内容'
    }},
    {path:'/',component:HomeVue,meta:{
        title:'SimpleForum - 简约而不简单'
    }},
    {path:'/bar',component:BarVue,meta:{
        title:'SimpleForum - 属于每一个人的网络家园'
    }},
    {path:'/m',component:ManageVue,meta:{
        title:'管理页'
    }},
    {path:'/p/:postId',component:PostVue,meta:{
        title:'贴子 - 每一张贴子,都能遇见每一种精彩'
    }},
    {
        path:'/user/:id',component:UserVue,meta:{
            title:'个人主页 - 贴吧,因为有你而不简单'
        }
    },{
        path:'/i',component:IVue,meta:{
            title:'修改个人资料 - 尽情个性化不一样的你'
        }
    }
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