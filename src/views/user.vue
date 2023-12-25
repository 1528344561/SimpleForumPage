<script setup>
import {useUserInfoStore} from '@/stores/userInfo.js'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {onMounted} from 'vue'
import {PostListByUserIdService} from '@/api/post.js'
const userInfoStore = useUserInfoStore()
const router = useRouter()
const currentUserId = ref(0)
const userModel = ref({
    id:0
})
const postModel = ref({
    postTitle: '',
    postId: '',
    barId:'',
    coverImg: '',
    postContent:'',
    state:'',
    createUser:''
})
const posts = ref([])
const setup=async()=>{
    currentUserId.value = Number(router.currentRoute.value.params.id)
    // alert(currentUserId.value)
    userModel.value.id = currentUserId.value


}

//下面是一个教训!!
//onMounted是要等vue组件全都加载完后再执行的,所以不能把取当前路由参数放到里面
//不然的话,Avatar组件加载的时候就没有值了(因为先加载了Avatar,才执行的setup读取值)
// onMounted(() => {
//     setup()
// })
setup()
const initPost = async()=>{
    let p = await PostListByUserIdService(userModel.value.id)
    posts.value = p.data
    console.log(p.data)
}
onMounted(()=>{
    initPost()
})
</script>

<template>
    <!-- {{ currentUserId }} -->
    <!-- {{ userModel.id }} -->
    <div class="user-page-body">

        <div class="user-bkg">
            <div class="container">
                <div class="header">
                    <!-- 用于隔开距离 勿删 -->
                </div>

                <div class="userinfo">
                    <div class="avatar">
                        <Avatar :userId=userModel.id :width="150" :isRound="false">
                        {{ currentUserId }}
                        </Avatar>
                    </div>
                    <div class="user-info">
                        <UserInfo :userId="userModel.id">

                        </UserInfo>
                    </div>
                </div>
                <div class="user-post-show-container">
                    <div class="user-post-show-body">
                        <div class="top-title">
                            <span class="cut-line">|</span>
                            <span>贴子</span>
                        </div>
                        <div class="all-post-info">
                            <DataList :dataSource=posts>
                                <template #default="data">
                                    <!-- <span>{{ data.postId }}</span> -->
                                    <PostListItem :data=data>

                                    </PostListItem>
                                </template>
                            </DataList>
                        </div>
                </div>
                </div>

            </div>

        </div>
    </div>
    
</template>

<style lang="css">
.user-page-body{
    width: 100%;
    height: 100vh;
    object-fit: contain;
    .user-bkg{
    /* margin-left: -30px; */
    height: 100vh;
    background-position: center;
    background-image: url(https://tb2.bdstatic.com/tb/static-ihome/img/bg_v1_1001.jpg?t=20160117&v=);
        .container{
            margin: 0 auto;
            .header{
                    width: 980px;
                    height: 220px;
                    margin: 20px auto 0;
                    position: relative;
            }
            .userinfo{
                min-height: 110px;
                width: 978px;
                margin: 0 auto;
                border-style: solid;
                border-color: #8FC0D3;
                border-width: 0 1px;
                background: #F5F7FA;
                position: relative;
                display: flex;
                /* flex-direction: ; */
                .avatar{
                    padding: 5px;
                }
                .user-info{
                    /* margin-top: 50px; */
                    position: absolute;
                    margin-left: 170px;
                    bottom: 5px;

                    /* left:150px, */
                }
            }
            .user-post-show-container{
                width: 980px;
                border-bottom: 1px solid #87BED9;
                margin: 0 auto;
                height: 100vh;
                background-color: #87BED9;
                .user-post-show-body{
                    background-color: #fff;
                    .top-title{
                        margin-left: 15px;
                        .cut-line{
                        color: #4585E6;
                        font-size: 14px;
                        font-weight: 700;
                        line-height: 16px;
                        vertical-align: top;
                        margin-right: 4px;
                        }
                    }
                    .all-post-info{
                        margin-left: 15px;
                    }

                }
            }

        }
    }
}


</style>