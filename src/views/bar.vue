
<script setup>
import {ref}from'vue'
import {barListService}from '@/api/bar.js'
import {barFindByBarNameService} from '@/api/bar.js'
import {PostListByBarIdService} from '@/api/post.js'
import {useRouter} from 'vue-router'
import {onMounted} from 'vue'
import {barGotoService} from '@/api/bar.js'
const bar = ref({
    barName:'',
    barIntroduction:'',
    barPic:'',
    barId:0,
})
const post = ref({
    
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
    let p = await PostListByBarIdService(bar.value.barId)
    posts.value = p.data
    console.log(p.data)
    console.log(posts.value.length)
    // console.log(bar.value)
    // alert(bar.value)
    // console.log(await barFindByBarNameService(bar.value.barName).message)
    // console.log(bar.value)
};

const handleRowClick = (row)=>{
    const postData = JSON.stringify(row)
    const postTitle = decodeURIComponent(JSON.parse(postData).postTitle)
    // selectBar.value = postName
    console.log()
    alert(postTitle)
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
</style>
