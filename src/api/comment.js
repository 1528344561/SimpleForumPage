import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'
import {useRouter} from 'vue-router'

//贴吧查询
const router = useRouter()

export const CommentListByPostIdService = (postId)=>{

    return request.get('/comment/list',{
        params:{
            postId:postId
        }
    })

}
export const CommentAddService = (commentData)=>{
    return request.post('/comment/add',commentData)

}