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