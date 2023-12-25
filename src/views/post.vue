<script setup>
import {onMounted} from 'vue'
import { ref } from 'vue'
import {useRouter} from 'vue-router'
import {Plus} from '@element-plus/icons-vue'
import {useUserInfoStore} from '@/stores/userInfo.js';

import {
    Edit,
    Delete,
    
} from '@element-plus/icons-vue'
import DefaultAvatar from '@/assets/default.png'

//富文本编辑器
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {PostFindByPostIdService} from '@/api/post.js'
import {userFindByIdService} from '@/api/user.js'
import {CommentListByPostIdService,CommentAddService} from '@/api/comment.js'
import {ElMessage} from 'element-plus'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const postModel = ref({
    postTitle: '',
    postId: '',
    barId:'',
    coverImg: '',
    postContent:'',
    state:'',
    createUser:''
})
const userInfoStore = useUserInfoStore();
const comments = ref([])
const commentModel = ref({
    commentId: '',
    creatUser: '',
    postId:'',
    commentContent: '',
    lastModifiedTime:'',
    createTime:'',
    updateTime:'',
    createUser:0

})
const userModel = ref({
    nickname:'',
    user_pic:'',
})
const lzModel = ref({

})
const lzId = ref('')
const commentList = async(postId)=>{
    let result = await CommentListByPostIdService(postId)
    comments.value = result.data
    console.log(comments.value)
}
const commentAdd = async()=>{
    if(!userInfoStore.info.id){
        ElMessage.error("请先登录")
        return 
    }
    // console.log(comment.value)
    console.log(commentModel.value.commentContent)
    commentModel.value.postId = postModel.value.postId
    commentModel.value.createUser = userInfoStore.info.id
    console.log(userInfoStore.info.id)
    let result = await CommentAddService(commentModel.value)
    visibleDrawer.value=false
    ElMessage.success("发布成功")
    commentList(postModel.value.postId)

}
const router = useRouter()
// visibleDrawer.value = true
const setup=async()=>{
    const PostId = router.currentRoute.value.params.postId
    postModel.value.postId = PostId
    console.log(PostId)
    let p = await PostFindByPostIdService(PostId)
    postModel.value = p.data
    let lz = await userFindByIdService(postModel.value.createUser)
    // console.log(lz)
    lzModel.value = lz.data
    lzId.value = lz.data.createUser

    commentList(postModel.value.postId)

    // console.log(lz.data)

    // alert(lzModel.value.nickname)
}
onMounted(() => {
    setup()
    // postModel.value = 
    // console.log(postModel.value.postId)
    // alert(router.currentRoute.value.params.postId)
})
</script>

<template>

    <div class="post_bkg"> 
        <div class="_container">
            <div class="_content">
                <div class="TitleAndButton">
                    <div class="PostTitle">
                        <div>
                            <h3>{{ postModel.postTitle }}</h3>
                        </div>

                        <div class="button">
                            <el-button type="primary" round @click="visibleDrawer=true" :icon="Edit" >回帖</el-button>
                            <!-- <el-button type="primary" icon="el-icon-edit"></el-button> -->
                        </div>

                    </div>
                </div>
                <!-- <div class="PostInfo">
                    <div class="Floors">
                        <div class="TOP_Floor">
                            <div class="Author" >
                            <div class="Avatar" width="100">
                                <Avatar :userId=lzModel.createUser>

                                </Avatar>
                            </div>
                            <div class="UserInfo">
                                <UserInfo :userId=lzModel.createUser>
                                </UserInfo>
                            </div>
                        </div>

                        <div class="CommentContent">
                            {{ postModel.postContent }}
                        </div>
                        </div>
                    </div>
                </div> -->
                <div class="Floors">


                    <!-- <div v-for="(item,idx) in comments " class="comment">
                        <CommentListItem :data="item" :idx="idx+1"> 
                        </CommentListItem>
                    </div> -->

                    <DataList :dataSource="comments">
                        <template #default="{data,idx}">
                            <commentListItem :data="data" :idx="idx">

                            </commentListItem>
                        </template>
                    </DataList>


                    <!-- <el-table :data="comments" style="width: 100%" show-header=false @row-click="handleRowClick">
                        <div class="Author">
                            <div class="Avatar">
                                <img src="">
                            </div>
                            <el-table-column prop="barName" label="" width="250">
                                <template #default="{ row }">
                                    <div class="row-container">
                                

                                        <div class="barPic">
                                            <img :src="row.barPic" alt="Bar Image" width="60" height="60" object-fit="fill">
                                        </div>
                                        <div class="barInfo">
                                            <div class="barName">
                                                {{ row.barName }}
                                            </div>
                                            <div class="barPeopleNum">

                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <span>

                            </span>
                        </div>

                        <el-table-column prop="barIntroduction" label="" width="180">
                        </el-table-column>
                    
                    </el-table> -->



                </div>
            </div>
    </div>

    </div>


            <el-drawer v-model="visibleDrawer" postTitle="添加贴子" direction="rtl" size="50%">
            <!-- 添加贴子表单 -->
            <el-form :model="postModel" label-width="100px" >
                <el-form-item label="当前贴子标题" >
                    <el-input v-model="postModel.postTitle" placeholder="请输入标题" :disabled="true"></el-input>
                </el-form-item>
                <!-- <el-form-item label="贴子分类">
                    <el-select placeholder="请选择" v-model="postModel.postId">
                        <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="贴子封面">

                    <el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false">
                        <img v-if="postModel.coverImg" :src="postModel.coverImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item> -->
                <el-form-item label="输入你的回帖">
                    <div class="editor">

                        <quill-editor 
                        v-model:content="commentModel.commentContent"
                            theme="snow"
                            contentType="html" >
                        </quill-editor>

                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="commentAdd">发布</el-button>
                    <el-button type="info">草稿</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: bl ock;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}


.button{
    // width: 500%;

}
.post_bkg{
    display: flex;
    flex-direction: column;
    width:100%;
    height: 100vh;
    display: table;
    background-color: #dceffe;

    ._container{
    width: 980px;
    margin: 0 auto;
    position: relative;
    ._content{
    // background-color: #FFFF;
    }
    
    }
}

.TitleAndButton{
    display: flex;
    // flex-direction: row;
    justify-content: space-between;
    // background-color: #fff;
}
.Author{
    display: flex;
    flex-direction: column;
}
.Floors{
    border-width: 5px;
    display: flex;
    flex-direction: column;

    border: 0;
    border-left: 1px solid #E5E5E5;
    border-bottom: 1px solid #8c939d;
    background: url(//tb2.bdstatic.com/tb/static-pb/widget/post_list/img/bg_ba2195f.jpg) repeat-y;
    width: 739px;
    
    // border;
    .comment{
        border-top: 1px solid #8c939d;
        border-left: 1px solid #8c939d;
        // text-decoration: none;

        // border-right: 1px solid #8c939d;
    }
}
.TOP_Floor{
    display: flex;
    flex-direction: row;
}
.PostInfo{
    margin-bottom: 40px;
    // border: #8c939d;
    // border-radius: 5px;
}
</style>