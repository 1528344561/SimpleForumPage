import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'
import {useRouter} from 'vue-router'

//贴吧查询
const router = useRouter()

export const barListService = ()=>{
    const tokenStore = useTokenStore();


    // return request.get('/bar/list')

    //在pinia中定义的响应式数据都不用.value可以直接使用 
    // return request.get('/bar/list',{headers:{'Authorization':tokenStore.token}})


    //直接通过请求拦截器加token,不再需要手动加
    return request.get('/bar/list')

}
export const barAddService =(newBar)=>{
    return request.post('/bar/add',newBar)
}
export const barGotoService = (barName)=>{
    // const params = new URL
    router.push('/bar/'+barName)
}