<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import {userRegisterService,userLoginService,userFindByIdService} from '@/api/user.js'
import { useTokenStore } from '@/stores/token.js';
import {useRouter} from 'vue-router';
import {useUserInfoStore} from '@/stores/userInfo.js';
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
const isEnter = ref(false)
const tokenStore = useTokenStore();
const router = useRouter();
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

//注册接口
const register = async()=>{
    if(registerData.value.password!==registerData.value.rePassword){
        ElMessage.error('两次输入的密码不同')
    }
    else{
    
        let result = await userRegisterService(registerData.value);


        // if(result.code===0){
        //     alert(result.msg?result.msg:'注册成功')
        // }else{
        //     alert(result.msg?result.msg:'注册失败')
        // }

        // alert(result.msg?result.msg:'注册成功')
        ElMessage.success(result.message?result.message:'注册成功')
        isRegister.value=false

    }
}
const userInfoStore = useUserInfoStore();

const login =async()=>{
    let result = await userLoginService(registerData.value);
    // if(result.code===0){
    //     alert(result.msg?result.msg:'登录成功')
    // }else{
    //     alert(result.msg?result.msg:'登录失败')
    // }
    // alert(result.msg?result.msg:'登录失败')

    ElMessage.success(result.data.message?result.data.message:'登录成功')

    tokenStore.setToken(result.data)
    // alert(result.data)
    let u = await userFindByIdService()
    console.log(u.data)
    userInfoStore.setInfo(u.data)
    router.push('/')
}

const clearRegisterData =()=>{
    registerData.value={
        account:'',
        password:'',
        rePassword:''
    }
}
const items=ref([
    '/src/assets/show_0.png',
    '/src/assets/show_1.png',
    '/src/assets/show_2.png'

])
const setup=()=>{
    // items.push()

}
setup()
const handleGotoHome=async()=>{
    router.push('/')
}
</script>

<template>
    <!-- <div class="rotate-hor-center">
        SimpleForum
    </div> -->
    <el-row class="login-page">
        <el-col :span="12" class="bg">
        <div id="capter" @click="handleGotoHome" title="前往贴吧首页">
            <h1>SimpleForum</h1>
        </div>
        <div class= "introduction">
            <div style="margin-left: 120px;">
              <h3>We feel excited for your coming!</h3>
            </div>
            <div class="block">
                <span class="demonstration" style="margin-left: 180px;">谨此以纪念 百度贴吧 辉煌的20年</span>
                <el-carousel height="450px">
                <el-carousel-item v-for="item in items">
                    <!-- <h3 class="small">{{ item }}</h3> -->
                    <img :src="item" style="width:100% ;height: 100%;object-fit:fill">
                </el-carousel-item>
                </el-carousel>
            </div>
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
                    <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="account">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.account"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>



    





   <div id="foot">
    
    <footer>
        <h5>CopyRight 2023 created by LZH and QSM</h5>
    </footer>
   </div>
</template>

<style lang="scss" scoped>
    h1{
        color: #94949e;
    }
/* 样式 */
@keyframes animate {
    from{
        background-position:0%;
    }
    to{
        background-position:400%;
    }
}
.login-page {
    height: 100vh;
    background-color: #161618;
    // background: 
    //     linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
    // background-size: 400%;
    //     animation: animate 10s linear infinite;
    // filter: blur(1px);

    .bg {
        // background: url('@/assets/logo3.png') no-repeat 60% center / 240px auto,
        //     url('@/assets/login_bg.jpg') no-repeat center / cover;

        // background: url('@/assets/logo3.png') no-repeat 60% center / 240px auto;
        border-radius: 0 10px 10px 0;
    }
    .introduction{
        display: flex;
        flex-direction: column;

        margin-left: 50px;
        color:darkgray;
        display: flex;
        // margin: auto;
        font-family: Arial;
        justify-content: center;
        font-size: 200%;
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
        cursor: pointer;
    }
    #websitename{
        color:cornflowerblue;
        font-family: Cambria;
        font-size: 200%;
        font-weight: 200%;
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