
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
    <div class="barInfo">
        <div class="barAvatar">
            <img :src="bar.barPic">

            <div class="barProfile">
            <span >{{ bar.barName }}吧</span>
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

</template>

<style lang="scss" scoped>
.barInfo{
    display: flex;
    flex-direction: row; 
    align-items: center;
}
.barProfile{
    display: flex;
    justify-content: flex-start;
    margin-left: 10px;
}
.barName{
    font-weight: 10px;
}
</style>
