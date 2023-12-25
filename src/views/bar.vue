
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
onMounted(() => {
  setup();
});

</script>

<template>
    <!-- {{ this.$route.query }}
    {{ this.$route.query.barName }} -->
    <div class="head_main">
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
                    
                <div class="barMoreInfo">
                    <div class="number_label">
                        <span>贴子数量:</span>
                    </div>
                    <div class="number_num">
                        <span>{{ posts.length }}</span>
                    </div>
                </div>
                <div class="barIntroduction">
                    <span >{{ bar.barIntroduction }}</span>
                </div>

            </div>
        </div>



        <div class="forum_rcmd">
            <div class="barShow">
            <el-main class="page-container">

            <el-table :data="posts" style="width: 100%" show-header="false" @row-click="handleRowClick">
            
                <el-table-column
                    prop="postTitle"
                    label=""
                    width="250">
            
            <!-- <div>
                <img :src="bars.barPic">
                <p>{{ bars.barName }}</p>

            </div> -->
            <template #default="{ row }">
                <div class="row-container">
            

            <div class="post">
                <!-- <img :src="row.barPic" alt="Bar Image" width="60" height="60" object-fit="fill"> -->
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
        </el-table>
            </el-main>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.head_main{
    position: relative;
    background-color: #dceffe;
}
.barAvatar_bord{
    padding: 2px;
    border: solid 1px rgba(0,0,0,.1);
    background: #fff;
    left: 0;
    top: 0;
    margin: 10px;
}
.barInfo[data-v-b013e4e0] {
    border: 2px solid wheat;
    width: 900px;
    height: 300px;
    padding: 10px;
    position: relative;
    left: 300px;
    background-color: white;
}
.barAvatar_bord[data-v-b013e4e0] {
    padding: 2px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    background: #fff;
    margin: 10px;
    width: 120px;
    position: relative;
    top: 110px;
}

.barProfile[data-v-b013e4e0][data-v-b013e4e0] {
    justify-content: flex-start;
    margin-right: 10px;
    position: relative;
    left: 200px;
    top: -30px;
}

.barName{
    font-size: 22px;
}
//贴吧数量
.barMoreInfo{
    font-size: 12px;
}
.number_label {
    color: #AAA;
    display: inline-block;
}
.number_num{
    color: #ff7f3e;
    font-family: Arial;
    display: inline-block;
}
.barIntroduction{
    color: #4c4c4c;
    width: 100px;
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
.forum_rcmd {
    border: 2px solid white;
    width: 922px;
    background: #fff;
    box-sizing: border-box;
    font-family: STHeiti,"Microsoft Yahei","Microsoft YaHei",Arial,sans-serif;
    margin: 0 auto;
    position: relative;
    left: 15px;
}
</style>
