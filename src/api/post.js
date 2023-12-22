import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'
import {useRouter} from 'vue-router'

//贴吧查询
const router = useRouter()

export const PostListByBarIdService = (barId)=>{

    return request.get('/post/list',{
        params:{
            type:0,
            Id:barId
        }
    })

}