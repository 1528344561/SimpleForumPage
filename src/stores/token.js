//定义store
import {ref} from 'vue'
import {defineStore} from 'pinia'


/*
    参数一:名字
    参数二:函数
    返回值:函数
*/
export const useTokenStore = defineStore('token',()=>{
    //定义状态内容

    const token = ref('')

    const setToken=(newToken)=>{
        token.value = newToken
    }
    const removeToken =()=>{
        token.value = ''
    }
    return {
        token,setToken,removeToken
    }
},{
    persist:true //持久化存储pinia
});