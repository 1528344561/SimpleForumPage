import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'
//贴吧查询

export const barListService = ()=>{
    const tokenStore = useTokenStore();

    //在pinia中定义的响应式数据都不用.value可以直接使用 
    return request.get('/bar/list',{headers:{'Authorization':tokenStore.token}})
    // return request.get('/bar/list')
}