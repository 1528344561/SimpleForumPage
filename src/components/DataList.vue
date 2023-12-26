<script setup>
import {onMounted} from 'vue'
const props = defineProps({
    dataSource:{
        type:Object
    },pageNum:{
        type:Number
    },
})
const emit = defineEmits(["loadData"])
const handlepageNumChange = (pageNum)=>{
    console.log(pageNum)
    //分页跳转
    // props.pageNum = pageNum; 只读的设置不了
    props.dataSource.pageNum = pageNum
    emit("loadData")
}
onMounted(()=>{
    console.log(props.dataSource)
})

</script>

<template>
        <!-- {{ props.dataSource }} -->
    
    <div v-for="(item,idx) in dataSource.items?dataSource.items:dataSource" class="data-show">
        <slot :data="item" :idx=(dataSource.pageNum?((dataSource.pageNum-1)*dataSource.pageSize):0)+idx+1></slot>
    </div>

    <div class="pagination">
        <!-- <el-pagination
            background  
            :total="dataSource.totalCount"
            :page-sizes="[15,30,50,100]"
            :page-size="dataSource.pageSize"
            :current-page.sync="dataSource.pageNum"
            layout="prev,pager,next"
            @current-change="handlepageNumChange"
            style="text-align: right;">

        </el-pagination> -->

        <el-pagination
            background
            :total="dataSource.total"
            :current-page.sync="dataSource.pageNum"
            layout="prev,pager,next"
            @current-change="handlepageNumChange"
            style="text-align: right;"
            
            >

        </el-pagination>
    </div>
</template>

<style lang ="css">
    .data-show{
        width: 100%;
    }
    .pagination{
        /* margin-top: 10px; */
        /* padding: 5px; */
        
    }
</style>