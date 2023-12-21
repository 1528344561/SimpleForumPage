<script setup>
import {ref}from'vue'
import {barListService}from '@/api/bar.js'



const bars = ref([

])
const barList = async()=>{
    let result = await barListService();

    bars.value = result.data;
    // alert(bars.value[1].barPic)
}
const barInputValue = ref('')
barList();
const handleRowClick = (row)=>{
    const barData = JSON.stringify(row)
    const barName = JSON.parse(barData).barName
    alert('你单击了 '+barName+'吧 诶...')
}
const handleGotoBar=()=>{
    // var inputValue = document.getElementById("kw1").value;
    alert(barInputValue.value)
}

</script>


<template>
    <div class="header_search">
        <div class="head_inner">
            <a rel="noopener" title="到贴吧首页" href="/" class="search_logo" style=""></a>
        </div>
        <input class="search_ipt search_inp_border j_search_input tb_header_search_input" 
        name="kw1" value="" type="text" autocomplete="off" size="42" tabindex="1" 
        id="wd1" maxlength="100" x-webkit-grammar="builtin:search" x-webkit-speech="true"
        v-model="barInputValue" >
        <div class="search_btn"  @click="handleGotoBar">
            <a rel="noopener"  href="#" >进入贴吧</a>
        </div>

    </div>

    <div class="forum_rcmd">
        <div class="barShow">
        <el-main class="page-container">
        <el-table :data="bars" style="width: 100%" show-header="false" @row-click="handleRowClick">
        <el-table-column
        prop="barName"
        label=""
        width="250">
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

            </div>
        </div>
      </div>
    </template>
      </el-table-column>
      <el-table-column
        prop="barIntroduction"
        label=""
        width="180">
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
    </div>
</template>
<style>
.page-container{
    
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
  .barShow{
    /* transform: translateX(20px); */
    margin-left: 200px;
    margin-right: auto;
    font-family: PingFangSC-Regular;
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
  .head_inner{
    display: flex;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
  .header_search{
    margin-top: 80px;
    display: grid;
    /* grid-template-columns: 200px,300px,70px; */
    grid-template-columns: repeat(3, 1fr);  
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
a {
    text-decoration: none;
  color: white;  /* 设置字体颜色为白色 */
  font-family: Arial, sans-serif;  /* 设置字体为 Arial，如果 Arial 不可用，使用备选的 sans-serif 字体 */
}
.forum_rcmd {
    padding: 16px 16px 0;
    width: 780px;
    background: #fff;
    border: 1px solid rgba(230,230,230,1);
    box-sizing: border-box;
    font-family: STHeiti,"Microsoft Yahei","Microsoft YaHei",Arial,sans-serif;
}
</style>


