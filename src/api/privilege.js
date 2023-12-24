import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'
import {useRouter} from 'vue-router'

//贴吧查询
const router = useRouter()

export const PrivilegeFindByUserIdService = (userId)=>{

    return request.get('/privilege/privilegeInfo',{
        params:{
            userId:userId
        }
    })  
}