
<script setup>
import {ref}from'vue'
import {barListService}from '@/api/bar.js'
import {barFindByBarNameService} from '@/api/bar.js'
import {PostListByBarIdService,PostAddService} from '@/api/post.js'
import {useRouter} from 'vue-router'
import {onMounted} from 'vue'
import {useUserInfoStore} from '@/stores/userInfo.js'

import {barGotoService} from '@/api/bar.js'
import { ElMessage } from 'element-plus'
const bar = ref({
    barName:'',
    barIntroduction:'',
    barPic:'',
    barId:0,
})
const post = ref({
    
})
const userInfoStore = useUserInfoStore();
const newPostModel = ref({
    postTitle:'',
    postContent:'',
    createUser:0,
    barId:0,
})
const posts = ref([

])
// alert(this.$route.query)
// const router = useRouter()

// alert(this.$route.query.barName)
// bar.value.barName = router.query.barName
    // const {query:{barName}} = router
// console.log(router.query.barName)

const router = useRouter();

const setup = async () => {
    bar.value.barName = router.currentRoute.value.query.barName;
    // alert(bar.value.barName);
    // bar.value =
    let result =  await barFindByBarNameService(bar.value.barName)
    bar.value = result.data
    // console.log(bar.value)
    // alert(bar.value.barId)
    postList()
    // console.log(bar.value)
    // alert(bar.value)
    // console.log(await barFindByBarNameService(bar.value.barName).message)
    // console.log(bar.value)
};
const postList = async()=>{
    newPostModel.value.barId = bar.value.barId
    newPostModel.value.createUser = userInfoStore.info.id
    let p = await PostListByBarIdService(bar.value.barId)
    posts.value = p.data
    console.log(p.data)
    console.log(posts.value.length)
}
const handleCreatePost = async()=>{
    let p = await PostAddService(newPostModel.value)


    newPostModel.value.postContent=''
    newPostModel.value.postTitle=''
    ElMessage.success(p.message?p.message:'发布成功')
    postList()
}
const handleRowClick = (row)=>{
    //此函数不再使用,由PostListItem接管 2023年12月26日12:20:32
    const postData = JSON.stringify(row)
    const postTitle = decodeURIComponent(JSON.parse(postData).postTitle)
    // selectBar.value = postName
    console.log()
    // alert(postTitle)
    // router.push({
    // path:'/bar',
    // query:{
    //   barName:barName
    //   }
    // })
    //   alert(barName)
    // router.push({
    //   path:'/bar',
    //   params:{barName:barName},
    // })

      // router.push('/bar/'+selectBar.value)


    // alert('你单击了 '+barName+'吧 诶...')

    // router.push('/bar')
    // barGotoService(barName)
}
setup();

onMounted(() => {
});

</script>

<template>
    <div class="head_main">
        <div class=bar-body>
            <div class="info-body">
            <div class="barInfo">
                <div class="barAvatar_bord">
                    <div class="barAvatar" >
                        <img :src="bar.barPic">
                    </div>
                </div>

            <div class="barProfile">
                <div class="barName">
                    <span >{{ bar.barName }}吧</span>
                </div>
                <div class="barIntroduction">
                    <span >{{ bar.barIntroduction }}</span>
                </div>                   
                <div class="barMoreInfo">
                    <div class="number_label">
                        <span>贴子:</span>
                    </div>
                    <div class="number_num">
                        <span>{{ posts.length }}</span>
                    </div>
                </div>


            </div>
        </div>
            </div>


            <div class="forum_rcmd">
                <div class="barShow">
                    <!-- {{ posts[1] }} -->
                    <el-container class="page-container">

                    <el-main >
                        <!-- 111 -->
                        <!-- {{ posts }} -->
                        <DataList :dataSource=posts>
                            <!-- 本来想在这里default后加idx,虽然我没用到,但是加了后就报错,说找不到postTitle... -->
                            <template #default="data">
                                <PostListItem :data=data>
                                    <!-- 1111111111111111 -->
                                </PostListItem>                    
                            </template>

                        </DataList>
                        <!-- <el-table :data="posts" style="width: 100%" show-header=false @row-click="handleRowClick">
                        
                            <el-table-column
                                prop="postTitle"
                                label=""
                                width="250">
                                <template #default="{ row }">
                                    <div class="row-container">
                                    

                                        <div class="post">
                                        </div>
                                        <div class="postTitle">
                                            <div class="postTitle">
                                                {{ row.postTitle }}
                                            </div>
                                            <div class="barPeopleNum">

                                        </div>
                                    </div>
                                </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="postContent"
                                label=""
                                width="180">
                            </el-table-column>
                        </el-table> -->
                    </el-main>
                </el-container>

                </div>
            </div>

            <div class="create-post-body">
                <div class="poster-head">
                    <div class="poster-head-btn">
                        
                        <span style="margin-left: 15px;">发表新贴</span>
                    </div>

                </div>
                <div class="poster-input-body">
                    <div class="poster-input">
                        <el-input v-model="newPostModel.postTitle" placeholder="贴子千万条,等你发一条">

                        </el-input>

                        <el-input type="textarea" style="margin-top: 15px;" :autosize="{ minRows: 8, maxRows: 15}" v-model="newPostModel.postContent" placeholder="与其赞同别人的话语,不如自己畅所欲言">

                        </el-input>
                    </div>
                </div>
                <div class="poster-send-btn-body">
                    <div class="poster-send-btn">
                        <button @click="handleCreatePost">
                            发 表
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>



</template>

<style lang="scss" scoped>
.head_main{
    
    position: relative;
    background-color: #dceffe;
    // display: flex;
    // flex-direction: column;

    // align-items: center;
    height: 100vh;
    .bar-body{
        display: grid;
        justify-content: center;
    }
}
.info-body{
    // width: 80%;
    border-top: 1px solid #E9EBF0;
    background-color: #F2F4F7;
    background-image: -webkit-linear-gradient(top,#f5f7fa,#f2f4f7);
    // height: 60%;
}
.barInfo {
    // border: 2px solid #FFF;
    // width: 922px;
    height: 300px;
    // padding: 10px;
    position: relative;
    
    // left: 300px;
    // background-color: white;
    // margin-left: 130px;
}
.barAvatar_bord {
    padding: 2px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    background: #fff;
    margin: 10px;
    width: 150px;
    height: 150px;
    position: relative;
    top: 120px;

    .barAvatar{
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

.barProfile {
    justify-content: flex-start;
    position: relative;
    left: 180px;
    top: 60px;
    width: 400px;

    .barName{
        width: auto;        
        font-size: 22px;
    }
    
    .barMoreInfo{
        width: auto;        

        font-size: 12px;
        .number_label {
            color: #AAA;
            display: inline-block;
        }
        .number_num{
            color: #ff7f3e;
            font-family: Arial;
            display: inline-block;
            margin-left: 10px;
        }
    }

    //贴吧数量

    .barIntroduction{
        color: #4c4c4c;
        width: auto;
        height: 100px;
        font-size: 14px;
        float: left;
        padding-right: 30px;
        position: relative;
        max-width: 280px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        // overflow: scroll;
    }
}



.forum_rcmd {
    // width: 100%;
    background: #fff;
    // box-sizing: border-box;
    font-family: STHeiti,"Microsoft Yahei","Microsoft YaHei",Arial,sans-serif;
    position: relative;

    border-right: 1px solid #e4e6eb;
    border-left: 1px solid #e4e6eb;
    border-bottom: 1px solid #e4e6eb;
}
.page-container{
    // width:200px;
    // width:auto;
    width: 730px;
}

.create-post-body{
    width: 100%;
    
    background: url(//tb2.bdstatic.com/tb/img/frs-footer/f_editor_94fd854.jpg) repeat;
    .poster-head{
        margin-top: 15px;

        .poster-head-btn{
            margin-left: 5px;
            display: inline-block;
            width: auto;
            height: 14px;
            background: url(//tb2.bdstatic.com/tb/img/poster/poster_icons_c5dd292.png) no-repeat;
            // text-align: center;
            
        }
    }
    .poster-input-body{
        margin-left: 25px;
        
        .poster-input{
            width: 90%;

            .el-input{
                margin-top: 15px;
            }
        }
    }
    .poster-send-btn-body{
        margin-left: 20px;
        margin-top: 30px;
        width: 100%;
        .poster-send-btn{
            margin-bottom: 15px;
            // width: auto;
            // color: #fff;

            button{
                background: #3e89fa;
                border-bottom-color: #2b71d9;
                border: 1px solid transparent;
                cursor: pointer;
                border-radius: 2px;
                font: inherit;
                font-size: 12px;
                color: #fff;
                padding: 7px 14px;
            }
        }
    }


}
</style>
