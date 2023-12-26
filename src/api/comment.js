import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'
import router from '@/router/index.js'


export const CommentListByPostIdService = (params)=>{

    return request.get('/comment/list',{
        params:params
    })
}
export const CommentAddService = (commentData)=>{
    return request.post('/comment/add',commentData)
}