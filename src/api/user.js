import request from '@/utils/request.js'

export const userRegisterService = (registerData)=>{
    //借助 UrlSearchParams 完成传递
    const params = new URLSearchParams();
    for (let key in registerData){
        params.append(key,registerData[key]);
    }

    //如果直接传 registerData,传的是json
    return request.post('/user/register',params);
}