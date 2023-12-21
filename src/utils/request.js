//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';

import { ElMessage } from 'element-plus';
import { useTokenStore } from '@/stores/token';
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({baseURL})

//请求拦截器
instance.interceptors.request.use(
    (config)=>{
        //请求前的回调

        //添加token
        const tokenStore = useTokenStore();

        if(tokenStore.token){
            config.headers.Authorization = tokenStore.token
        }

        return config

    },
    (err)=>{
        //请求错误的回调

        Promise.reject(err)
    }
)

//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        if(result.data.code===0){
            // alert("success")
            return result.data;
        }

        //操作失败
        // alert(result.data.message?result.data.message:'服务异常')
        ElMessage.error(result.data.message?result.data.message:'服务异常')
        return Promise.reject(result.data)
    },
    err=>{
        // alert(result.data.message?result.data.message:'服务异常');
        ElMessage.error(result.data.message?result.data.message:'服务异常')
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;