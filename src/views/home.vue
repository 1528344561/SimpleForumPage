<script setup>
import {ref}from'vue'
import {barListService}from '@/api/bar.js'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import {useUserInfoStore} from '@/stores/userInfo.js'
import {useTokenStore} from '@/stores/token.js'
import {getPostNumberByBarIdService} from '@/api/post.js'
import {barAddService} from '@/api/bar.js'
import { QuillEditor } from '@vueup/vue-quill'
import {Plus} from '@element-plus/icons-vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// import {userInfoStore} from '@/views/Login.vue'
import {
    Edit,
    Delete,
    Message    
} from '@element-plus/icons-vue'
const visibleDrawer = ref(false)

const bars = ref(
    []

)
const barModel = ref({
  barName:'',
  barIntroduction:'',
  barPic:'',
  createUser:{
    type:Number
  },
})
const selectBar = ref([

])

const barList = async()=>{
    let result = await barListService();

    bars.value = result.data;
    for(let i=0;i<bars.value.length;i++){
      let p = await getPostNumberByBarIdService(bars.value[i].barId)
      bars.value[i].postNum = p.data
    }
    console.log(bars.value)
    // alert(bars.value[1].barPic)
}
barList();
const router = useRouter()
const userInfoStore = useUserInfoStore()
const tokenStore = useTokenStore()
const barInputValue = ref('')

//单击跳转贴吧
const handleRowClick = (row)=>{
    const barData = JSON.stringify(row)
    const barName = decodeURIComponent(JSON.parse(barData).barName)
    selectBar.value = barName
    
    router.push({
    path:'/bar',
    query:{
      barName:barName
      }
    })
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

const uploadSuccess = (result)=>{
  barModel.value.barPic = result.data
  console.log(result.data)
}

const addBar =async()=>{
  barModel.value.createUser = userInfoStore.info.id
  console.log(barModel.value)
  let result =await barAddService(barModel.value)
  console.log(result.data)
  visibleDrawer.value = false
  ElMessage.success(result.message?result.message:'创建成功')
}
// alert(userInfoStore.info.id)

</script>


<template>

  <div class="home-body">


    <!-- 贴吧列表框架 -->
    <div class="forum_rcmd">
        <div class="frame-left">
          <div class="content">
              <div class="Title">
                我在贴吧
              </div>
              <div class="UserInfo">
                  <Avatar :userId="userInfoStore.info.id">
                  </Avatar>
                <UserInfo :userId="userInfoStore.info.id">

                </UserInfo> 
            </div>
          </div>


        </div>
        <div class="barShow">
          <div class="Title">
              <img src="https://tb3.bdstatic.com/public/img/hot.ded08c52.png" class="hot_icon">热门吧
          </div>
            <el-main class="page-container">

              <el-table :data="bars" style="cursor: pointer;" show-header=false @row-click="handleRowClick">

                <el-table-column prop="barName" label="" width="250">

                <!-- <div>
                <img :src="bars.barPic">
                <p>{{ bars.barName }}</p>

                </div> -->
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
                            <span>1</span>
                        </div>
                        <div class="barCommentNum">
                          <span>{{ row.postNum }}</span>
                        </div>
                    </div>
                  </div>
                </template>
                </el-table-column>
                <el-table-column prop="barIntroduction" label="" width="350">
                </el-table-column>
              </el-table>



            <!-- <el-table :data="bars" style="width: 100%">
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column>
            <template slot="header">
            <span>贴吧图标</span>
            </template>
            <template slot-scope="scope">
            <img :src="scope.row.icon" alt="贴吧图标" width="30">
            </template>
            </el-table-column>
            <el-table-column prop="name" label="贴吧名称">
            </el-table-column>
            <el-table-column prop="members" label="贴吧人数">
            </el-table-column>
            </el-table> -->



            <!-- <el-card class="box-card" data="bars">
            <div v-for="o in 5" :key="o" class="text item">
            {{'列表内容 ' + o }}
            </div>
            <div prop="barName">
            {{ bars.barIntroduction}}

            </div>
            </el-card> -->


            </el-main>
          </div>
        <div class="right-buttons">
            <el-button type="primary" round :icon="Edit" @click="visibleDrawer=true">
                创建贴吧
            </el-button>
        </div>

        <div class="create-bar-aside" style="width: auto">
          <el-drawer v-model="visibleDrawer" direction="rtl" size="50%" >
            <!-- 添加贴吧表单 -->
            <el-form :model="barModel" label-width="100px" >
                <el-form-item label="贴吧名称" >
                    <el-input v-model="barModel.barName" placeholder="给你的新贴吧起一个什么名字呢?" style="width: 65%;"></el-input>
                </el-form-item>
                <!-- <el-form-item label="贴吧分类">
                    <el-select placeholder="请选择" v-model="barModel.postId">
                        <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="贴吧封面">
                  <!-- auto-upload:设置是否自动上传
                  action:设置服务器接口路径
                  name:设置上传的文件字段名
                  headers:设置上传的请求头
                  on-success:上传成功的回调函数 -->
                <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                action="/api/upload" name="file" :headers="{'Authorization':tokenStore.token}"
                :on-success="uploadSuccess">
                    <img v-if="barModel.barPic" :src="barModel.barPic" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
                </el-form-item>
                <el-form-item label="贴吧介绍">
                  <el-input v-model="barModel.barIntroduction"  type="textarea" placeholder="简单介绍一下你的贴吧!" :autosize="{ minRows: 8, maxRows: 15}" style="width: 65%;"></el-input>
                    <!-- <div class="editor">

                        <quill-editor
                            theme="snow"
                            v-model:content="barModel.barIntroduction"
                            contentType="html">
                        </quill-editor>

                    </div> -->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addBar">创建</el-button>
                    <!-- <el-button type="info">草稿</el-button> -->
                </el-form-item>
            </el-form>
          </el-drawer>

        </div>

    </div>
  </div>    

</template>
<style>
.page-container{
}
.home-body{
  /* background-color: #fff; */
}
.forum_rcmd{
  display: flex;
  flex-direction: row;
  padding: 16px 16px 0;
  width: 780px;
  background: #fff;
  box-sizing: border-box;
  font-family: STHeiti,"Microsoft Yahei","Microsoft YaHei",Arial,sans-serif;
  margin:0 auto;
  .frame-left{
    border-top: 1px solid #DCDCDC;
    border-bottom: 1px solid #DCDCDC;

    width: 210px;
    height: 800px;
    background: url(//tb2.bdstatic.com/tb/static-spage/img/big-bg_3854efe.png) repeat-y -4px 0;
    .content{
      margin-left: 10px;
      .Title{
        font-size: 14px;
        font-weight: 700;
        font-family: "microsoft yahei",simhei,sans-serif;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .UserInfo{
        width: 300px;
        display: flex;
        flex-direction: column;
      }
    }
  }
  .barShow{
    /* transform: translateX(20px); */
    /* margin-left: 200px; */
    margin-left: 10px;
    margin-right: auto;
    font-family: PingFangSC-Regular;
    .Title{
      font-size: 16px;
      margin-left: 30px;
      margin-top: 10px;
      font-weight: 700;
      .hot_icon{
        width: 18px;
        height: 18px;
        margin-right: 4px;
        vertical-align: middle;
      }
    }
    border: 1px solid rgba(230,230,230,1);
  }
  .right-buttons{
  position: fixed;
  margin-top: 100px;
  margin-left: 900px;
  }

}
.text {
    font-size: 14px;
}

  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 480px;
  }
  .center{
    margin-left: auto;
    /* margin: auto; */
  }

  .barPic{
    object-fit: contain;
    width: 60px;
    height: 60px;
    border: 2px solid rgba(0,0,0,.1);
    border-radius: 6px;
    background: #f7f7f7;

  }
  .barName{
    width: 102px;
    font-size: 15px;
    color: #000;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .barInfo{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .row-container{
    display: flex;
  }
  .header_button{
    font-size: 13px;
    color: #000 !important;
  }

  .head_inner{
    display: flex;
    text-align: center;
    margin-left: auto;
    margin-right: 0;
  }

  /* margin-top: 80px; */


  .header_search{
    display: grid;
    /* grid-template-columns: 200px,300px,70px; */
    grid-template-columns: repeat(3, 1fr);  
    margin-top: 10px;
    /* 三列等分 */
  /* grid-gap: 10px;   */
  }
  .head_inner .search_logo {
    position: relative;
    top: -9px;
    margin-right: 20px;
    float: left;
    background-image: url(/file/search_logo.png);
    background-color: #fff;
    background-size: cover;
    width: 135px;
    height: 45px
}
.search_ipt{
    font-family: Arial;
    height: 30px;
    padding: 4px 10px 4px 7px;
    line-height: normal;
    overflow: hidden;
    border: 0;
    color: #53545e;
    font-size: 16px;
    float: left;
    display: inline;
    border: 2px solid rgba(0,0,0,.1);
    border-radius: 6px;
}
.search_btn{
    cursor: pointer;
    width: 104px;
    height: 40px;
    background-color: #3385ff;  /* 背景颜色为蓝色 */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;

}
.search_btn:hover{
    background-color: #0b65ec;
}
.search_btn_text {
  text-decoration: none ;
  color: white;  /* 设置字体颜色为白色 */
  font-family: Arial, sans-serif;  /* 设置字体为 Arial，如果 Arial 不可用，使用备选的 sans-serif 字体 */
}
.barInfo{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.barPeopleNum{
  background-image: url(https://tb3.bdstatic.com/public/img/member.afa8b8f5.png?t=1684152777240);
  padding-left: 14px;
    font-size: 12px;
    color: #949494;
    line-height: 12px;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    background-position-y: center;
}
.barCommentNum{
  padding-left: 14px;
  font-size: 12px;
  color: #949494;
  line-height: 12px;
  background-repeat: no-repeat;
  background-size: 12px 12px;
  background-position-y: center;
  background-image: url(https://tb3.bdstatic.com/public/img/comment.a6617125.png?t=1684152777240);
}



.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }






      }
  }
  .editor {
    width: 100%;
    :deep(.ql-editor) {
      min-height: 200px;
    }
}
.el-upload:hover {
            border-color: var(--el-color-primary);
}
.el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }
.el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
}
</style>


