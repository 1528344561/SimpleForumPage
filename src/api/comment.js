import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'
import router from '@/router/index.js'


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