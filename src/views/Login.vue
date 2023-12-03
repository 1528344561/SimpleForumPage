<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
//定义数据模型
const registerData = ref({
    account:'',
    password:'',
    rePassword:''
})
//校验密码函数
const checkRePassword =(rule,value,callback)=>{
    if(value===''){
        callback(new Error('不能为空'))
    }else if(value!==registerData.value.password){
        callback(new Error('密码不同'))
    }else{
        callback()
    }
}
const rules={
    account:[
        {required:true,message:'请输入用户名',trigger:'blur'},
        {min:5,max:16,message:'5-16位',trigger:'blur'}

    ],
    password:[
        {required:true,message:'请输入密码',trigger:'blur'},
        {min:5,max:16,message:'5-16位',trigger:'blur'}
    ],
    rePassword:[
        {required:true,message:'请再输入密码',trigger:'blur'},
        {min:5,max:16,message:'5-16位',trigger:'blur'},
        {validator:checkRePassword,trigger:'blur'}
    ]
}

import {userRegisterService} from '@/api/user.js'
//注册接口
const register = async()=>{
    if(registerData.value.password!==registerData.value.rePassword){
        
    }
    else{
    
        let result = await userRegisterService(registerData.value);
        if(result.code===0){
            //success
            alert('注册成功'+result.message)
        }else{
            alert(result.message)
        }
    }
}
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg">
        <div id="capter">
            <h1>SimpleForum</h1>
        </div>
        <div id = "introduction">
            <h3>We feel excited for your coming!</h3>
        </div>
        </el-col>
        <el-col :span="6" :offset="3" class="form">
            <div id="websitename">
                <h1>SimpleForum</h1>
            </div>
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="account">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.account"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else>
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item>
                    <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space>登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-row>
        
    </el-row>

   <div id="foot">
    
    <footer>
        <h5>CopyRight 2023 created by LZH and QSM</h5>
    </footer>
   </div>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        // background: url('@/assets/logo3.png') no-repeat 60% center / 240px auto,
        //     url('@/assets/login_bg.jpg') no-repeat center / cover;

        // background: url('@/assets/logo3.png') no-repeat 60% center / 240px auto;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
    #capter{
        margin: auto;
        display: flex;
        // text-align: center;
        color:cornflowerblue;
        justify-content: center;
        font-size: 60px;
        font-weight: 80px;
        font-family: Cambria;
    }
    #websitename{
        color:cornflowerblue;
        font-family: Cambria;
        font-size: 200%;
        font-weight: 200%;
    }
    #introduction{
        color:darkgray;
        display: flex;
        margin: auto;
        font-family: Arial;
        justify-content: center;
        font-size: 200%;
    }
    // #foot{
    //     color: cadetblue;
    //     justify-content: center;
    //     margin: auto;
    //     display: flex;
    //     text-align: center;
    //     width: 100%;

    // }
    footer{
        clear: both;
        display: block;
        position: absolute;
        bottom: 100px;
        display: flex; justify-content: center;
    }
}
</style>