import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'
import router from '@/router/index.js'

export const PostAddService = (postData)=>{
    return request.post('/post/add',postData)
}
export const PostListByBarIdService = (barId)=>{

    return request.get('/post/list',{
        params:{
            type:0,
            Id:barId
        }
    })
}
export const PostListByUserIdService = (userId)=>{
    return request.get('/post/list',{
        params:{
            type:1,
            Id:userId
        }
    })
}
export const PostFindByPostIdService = (postId)=>{

    return request.get('/post/postInfo',{
        params:{
            postId:postId
        }
    })

}
export const getPostNumberByBarIdService = (barId)=>{

    return request.get('/post/postNumber',{
        params:{
            type:1,
            id:barId
        }
    })
}