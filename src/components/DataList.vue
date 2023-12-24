<script setup>
const props = defineProps({
    dataSource:{
        type:Object
    }
})
const emit = defineEmits("loadData")
const handlePageNoChange = (pageNo)=>{
    props.dataSource.pageNo = pageNo;//分页跳转
    emit("loadData")
}
console.log(props.dataSource)
</script>

<template>
    <div v-for="item in dataSource">
        <slot :data="item"></slot>
    </div>

    <div class="pagination">
        <!-- <el-pagination
            background  
            :total="dataSource.totalCount"
            :page-sizes="[15,30,50,100]"
            :page-size="dataSource.pageSize"
            :current-page.sync="dataSource.pageNo"
            layout="prev,pager,next"
            @current-change="handlePageNoChange"
            style="text-align: right;">

        </el-pagination> -->

        <el-pagination
            background
            :total="dataSource.totalCount"
            :current-page.sync="dataSource.pageNo"
            layout="prev,pager,next"
            @current-change="handlePageNoChange"
            style="text-align: right;">

        </el-pagination>
    </div>
</template>