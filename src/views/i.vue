<script setup>
import {ref} from 'vue'
import {useUserInfoStore} from '@/stores/userInfo.js'
import {userUpdateService} from '@/api/user.js'
import {useTokenStore} from '@/stores/token.js'
import { ElMessage } from 'element-plus';
const userInfoStore = useUserInfoStore()
const tokenStore = useTokenStore()
const curUserModel = ref({

})
const newUserModel = ref({

})
const setup = async()=>{
    curUserModel.value = userInfoStore.info
    if(!curUserModel.value.userPic)
        curUserModel.value.userPic='/src/assets/default.png'
    newUserModel.value = JSON.parse(JSON.stringify(curUserModel.value))
}
setup()
const handleUpdateClick = async()=>{
    let p = await userUpdateService(newUserModel.value)
    console.log(p)
    userInfoStore.setInfo(JSON.parse(JSON.stringify(newUserModel.value)))
    curUserModel.value = JSON.parse(JSON.stringify(newUserModel.value))

    ElMessage.success(p.message?p.message:'修改成功')
}
const uploadSuccess = async(result)=>{
    console.log(result)
    
    newUserModel.value.userPic = result.data;
}
</script>

<template>
    
    <div class="i-body">
        <div class="i-container">
            <div class="main_header">
                <ul class="nav_bar">
                    <li class="nav_item">
                        <a href="/" onmousedown="$.stats.hive('tb_index')" target="_self">贴吧首页</a>
                    </li>
                    <li class="nav_cur">
                        <a href="/i" onmousedown="$.stats.hive('tb_itb')" target="_self">我的i贴吧</a>
                    </li>
                </ul>
            </div>

            <div class="main-container">
                <div class="main-left">
                    <div class="user-sub-tab">
                        <a href="/i" target="_self">基本资料</a>
                    </div>

                    <div class="left-info">
                        <div class="tabs">
                            <div class="tab">
                                <div class="tab-content">
                                    <div class="top-title">
                                        <h4>当前头像</h4>
                                    </div>

                                    <div class="cur-pic">
                                        <!-- <div class="user-pic">
                                            <Avatar :userId="curUserModel.id" :width="118">
                                            </Avatar>

                                        </div> -->

                                            <img class="user-pic" :src="curUserModel.userPic">
                                    </div>
                                </div>
                            </div>
                            <div class="tab">
                                <div class="tab-content">
                                    <div class="top-title">

                                        
                                        <h4>设置新头像</h4>
                                    </div>
                                        <div class="cur-pic">
                                            <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                                        action="/api/upload" name="file" :headers="{'Authorization':tokenStore.token}"
                                        :on-success="uploadSuccess">
                                            <img class="user-pic" :src="newUserModel.userPic">
                                            <!-- <img v-if="barModel.barPic" :src="barModel.barPic" class="avatar" />
                                            <el-icon v-else class="avatar-uploader-icon">
                                                <Plus />
                                            </el-icon> -->
                                        </el-upload>
                                            
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="setting">
                            <div class="new-info">
                                <div class="new-nickname">
                                    <span>新昵称:</span>
                                    
                                    <el-input v-model="newUserModel.nickname"></el-input>
                                </div>
                                <!-- <div class="new-password">
                                    <span>新密码:</span>
                                    <el-input v-model="newUserModel.nickname"></el-input>
                                </div> -->
                            </div>
                           <img class="btn_save" src="https://tb1.bdstatic.com/tb/static-itieba3/img/user_save.png" @click="handleUpdateClick">
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="css">
    .i-body{
        width: 100%;
        height: auto;
        text-align: center;
        .i-container{
            display: inline-block;
            margin: auto;
            .main_header{
                height: auto;
                width: 980px;
                ul{
                    display: block;
                    li{
                        list-style: none;
                    }
                }
                .nav_bar{
                    display: flex;
                    flex-direction: row;
                    background: url(//tb2.bdstatic.com/tb/static-itieba3/img/nav_bg.png?t=1676618610367) scroll 0 0 repeat-x transparent;
                    box-sizing: content-box;
                        a{
                            line-height: 32px;
                            color: rgb(255, 255, 255);
                            font-weight: 700;
                            font-size: 14px;
                            display: block;
                            width: 100px;
                            text-align: center;
                            text-decoration: none;
                            background: url(//tb2.bdstatic.com/tb/static-itieba3/img/nav_itb.png?t=1676618608545) scroll 0 0 no-repeat transparent;
                        }
                    .nav-item{
                        display: inline-block;
                        zoom: 1;
                        height: 32px;
                        vertical-align: top;
                    }
                }
            }

            .main-container{
                .main-left{
                    width: 60%;

                    .user-sub-tab{
                        margin: 14px 8px 0;
                        a{
                            font-weight: 700;
                            font-family: 宋体, 微软雅黑, arial;
                            display: inline-block;
                            padding: 0 20px;
                            height: 28px;
                            line-height: 28px;
                            overflow: hidden;
                            background: url(//tb2.bdstatic.com/tb/static-itieba3/img/sub_nav_bg.png?t=1676618608546) repeat-x scroll left top transparent;
                            color: #999;
                            text-decoration: none;
                        }
                    }
                    .left-info{
                        .tabs{
                            display: flex;
                            flex-direction: row;
                            .tab{
                                width: 50%;
                                .tab-content{
                                    .top-title{
                                        h4{
                                            width: 90%;
                                            height: 28px;
                                            line-height: 28px;
                                            border-bottom: 1px #cdd7d9 solid;
                                            font-size: 14px;
                                            font-weight: 700;
                                            color: #000;
                                            margin-bottom: 21px;
                                            font-family: "microsoft yahei",simhei,sans-serif;
                                        }
                                    }
                                    .cur-pic{
                                        .user-pic{
                                            width: 118px;
                                            height: 118px;
                                            padding: 5px;
                                            background: url(//img.baidu.com/passport/center/picbg.jpg?t=1676618610122) no-repeat;
                                        }
                                    }
                                }
                            }

                        }

                        .setting{
                            .new-info{
                                margin-top: 30px;
                                font-size: 14px;
                                .el-input{
                                    margin-left: 5px;
                                    width: 40%;
                                }
                                .new-nickname{

                                }
                            }
                            .btn_save{
                                margin-top: 5px;
                                cursor: pointer;
                            }
                        }

                    }
                }
            }

        }
    }

</style>