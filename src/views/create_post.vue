<script setup>
import {onMounted} from 'vue'
import { ref } from 'vue'
import {useRouter} from 'vue-router'
import {Plus} from '@element-plus/icons-vue'
import {
    Edit,
    Delete,
    
} from '@element-plus/icons-vue'


//富文本编辑器
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {PostFindByPostIdService} from '@/api/post.js'
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

const router = useRouter()
// visibleDrawer.value = true
const setup=async()=>{
    const PostId = router.currentRoute.value.params.postId
    postModel.value.postId = PostId
    console.log(PostId)
    let p = await PostFindByPostIdService(PostId)
    postModel.value = p.data
}
onMounted(() => {
    setup()
    // postModel.value = 
    console.log(postModel.value.postId)
    // alert(router.currentRoute.value.params.postId)
})
</script>

<template>
    <div class="button">
        <el-button type="primary" round @click="visibleDrawer=true" :icon="Edit" >回帖</el-button>
        <!-- <el-button type="primary" icon="el-icon-edit"></el-button> -->
    </div>
    {{ $route.postId }}
            <el-drawer v-model="visibleDrawer" postTitle="添加贴子" direction="rtl" size="50%">
            <!-- 添加贴子表单 -->
            <el-form :model="postModel" label-width="100px" >
                <el-form-item label="贴子标题" >
                    <el-input v-model="postModel.postTitle" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="贴子分类">
                    <el-select placeholder="请选择" v-model="postModel.postId">
                        <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="贴子封面">

                    <el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false">
                        <img v-if="postModel.coverImg" :src="postModel.coverImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="贴子内容">
                    <div class="editor">

                        <quill-editor
                            theme="snow"
                            v-model:content="postModel.postContent"
                            contentType="html">
                        </quill-editor>

                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">发布</el-button>
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
</style>