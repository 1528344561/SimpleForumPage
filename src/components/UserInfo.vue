<script setup>  
import {ref} from 'vue';
import {useRouter} from 'vue-router'
import {userFindByIdService} from '@/api/user.js'
import {PrivilegeFindByUserIdService} from '@/api/privilege.js'
const router = useRouter()

const props = defineProps({
    userId:{
        type:Number,
    }
})
const userInfo = ref({
    nickname:'',
    createTime:'',
    privilegeNum:Number,
})
const gotoUserCenter = ()=>{
    if(props.addLink){
        router.push('/user/'+props.userId)
    }
}
const getUserInfo = async()=>{
    if(!props.userId){
        userInfo.value.nickname = null
        userInfo.value.privilegeNum = 0
        return ;
    }
    let u = await userFindByIdService(props.userId)
    console.log(u)
    if(!u.data.nickname){
        userInfo.value.nickname = '默认用户名'
        // userInfo.value.privilegeNum
    }else{
        // AvatarUrl.value = u.data.userPic
        userInfo.value = u.data
    }
    let p = await PrivilegeFindByUserIdService(props.userId)
    userInfo.value.privilegeNum = p.data
    // alert(p.data)
}

getUserInfo()
</script>


<template>
    <div class="userInfo" v-if=userInfo.nickname>
        <div class="nickName" >
            {{ userInfo.nickname }}
        </div>
        <div  v-if="userInfo.privilegeNum >= 1" class="user_icon">
            <span>1</span>
        </div>
        <div class="create-time">
            注册: {{ userInfo.createTime }}
        </div>

    </div>
</template>

<style lang="css">
    .userInfo{
        color: #000;
        text-decoration:none;
        .user_icon{
            background: url(http://tb2.bdstatic.com/tb/static-puser/widget/pb_author/img/grade_groups_5d89d63.png) 0 -760px no-repeat;
    text-indent: -999px;
        }
        .create-time{
            font-size: 14px;
        }
    }
</style>