<script setup>
import {useRouter} from 'vue-router'
import {barGotoService,barFindByBarNameService} from '@/api/bar.js'
import {ElMessage} from 'element-plus'

import {useUserInfoStore} from '@/stores/userInfo.js';
const userInfoStore = useUserInfoStore()
const router = useRouter()

//搜索框跳转贴吧
const handleGotoBar=async()=>{
    var inputValue = document.getElementById("wd1").value;
    // alert(inputValue)
    let result = await barFindByBarNameService(inputValue)

    ElMessage.success('成功跳转 '+inputValue +' 吧')
    router.push({
      path:'/bar/',
      query:{
        barName:inputValue
      }
    })
}

</script>
<template>
    <div class="top" style="width: 100%;">
        <div class="u_menu_item">
            <el-container>
                <el-header height="20px"   >
                    <div class="header_button">
                    <div>
                        <a :href="'/user/'+userInfoStore.info.id">{{ userInfoStore.info.nickname }}</a>
                    </div>
                    <div>
                        <a v-if="!userInfoStore.info.id" href="/login" @click="userInfoStore.removeInfo()">登录</a>
                        <a v-else href="/login" @click="userInfoStore.removeInfo()">退出 </a>
                    </div>
                    </div>  
                </el-header>
            </el-container>
        </div>
    </div>

    <!-- 搜索栏 -->
    <div class="header_search" v-if="$route.path!=='/login'">
        <div class="head_inner">
            <a rel="noopener" title="到贴吧首页" href="/" class="search_logo" style=""></a>
        </div>
        <input class="search_ipt search_inp_border j_search_input tb_header_search_input" 
        name="kw1" value="" type="text" autocomplete="off" size="42" tabindex="1" 
        id="wd1" maxlength="100" x-webkit-grammar="builtin:search" x-webkit-speech="true"
        v-model="barInputValue" >
        <div class="search_btn"  @click="handleGotoBar">
            <div class="search_btn_text">
            <span>进入贴吧</span>
            <!-- <a rel="noopener"  href="#">进入贴吧</a> -->
            </div>
        </div>
    </div>

</template>

<style lang="css">
.top{
    /* margin-bottom: 32px; */
    border-bottom: 1px solid #ebebeb;
    overflow: hidden;
    background-color: #fff;
    /* align-items: center; */
    /* text-align: center; */
    
    /* vertical-align: middle; */
    height: 32px;
    font-size: 13px;
    font-weight: 700;



    

}
.u_menu_item a:visited{
    color:#333;
    align-items: center;
}
.u_menu_item{
        display: flex;
        flex-direction: row;
        margin-left: 80%;
        justify-content: space-between;
        align-items: center;
        /* margin-left: 10px; */
        .header_button{
            margin-top: 4px;
            width: 120px;
            display: flex;
            justify-content: space-between;
            /* align-items: center; */
        }
}
</style>