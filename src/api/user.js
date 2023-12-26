import request from '@/utils/request.js' 

export const userRegisterService = (registerData)=>{
    //借助 UrlSearchParams 完成传递
    const params = new URLSearchParams();
    for (let key in registerData){
        params.append(key,registerData[key]);
    }

    //如果直接传 registerData,传的是json
    return request.post('/user/register',params);;
}

export const userLoginService = (loginData)=>{
    const params = new URLSearchParams();
    for(let key in loginData){
        params.append(key,loginData[key]);
    }
    return request.post('/user/login', params)
}

export const userFindByIdService = (userId)=>{
    //若为空,返回的是当前用户
    return request.get('/user/userInfo',{
        params:{
            userId:userId
        }
    })
}
export const userUpdateService = (user)=>{
    return request.put('/user/update',user)
}