<script setup>  
import {ref} from 'vue';
import {useRouter} from 'vue-router'
import {userFindByIdService} from '@/api/user.js'
const router = useRouter()

const props = defineProps({
    userId:{
        type:Number
    },
    width:{
        type:Number,
        default:60,
    },
    isRound:{
        type:Boolean,
        default:true,
    },
    addLink:{
        //点击头像跳转
        type:Boolean,
        default:true,
    }
})
const AvatarUrl = ref('')
const gotoUserCenter = ()=>{
    // console.log()
    // alert(props.userId)
    if(!props.userId){
        // alert('123')
        router.push('/login')
        return ;
    }
    if(props.addLink){
        router.push('/user/'+props.userId)
    }
}
const getUserAvatarUrl = async()=>{
    if(!props.userId){
        // alert(123)
        return ;
    }
    let u = await userFindByIdService(props.userId)
    if(!u.data.userPic){
        AvatarUrl.value = '/src/assets/default.png'
    }else{
        AvatarUrl.value = u.data.userPic
    }
}
getUserAvatarUrl()
</script>


<template>
    <div class="Avatar" @click="gotoUserCenter"
    :style="{
        width:width+'px',
        height:width+'px',
        'border-radius':width / 2 + 'px'
    }">
            <span v-if=!AvatarUrl class="NoLoginTitle"  > 登录 </span>
            <el-image v-if=AvatarUrl
            :style="{
            width:width+'px',
            height:width+'px',
            'border-radius':isRound?width / 2:0 + 'px'
            }"
        :src="AvatarUrl">

        </el-image>

    </div>
</template>

<style lang="css">
.Avatar{
    background-color: #00AEEC;
    display: flex;
    text-align: center;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    .NoLoginTitle{
        font-size: 14px;
        font-weight: 700;
        color:#fff;
        /* -webkit-tap-highlight-color: transparent; */
    }
}
</style>