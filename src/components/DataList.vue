<script setup>
import {onMounted} from 'vue'
const props = defineProps({
    dataSource:{
        type:Object
    },
    totalCount:{
        type:Number,
        default:2
    }
})
const emit = defineEmits("loadData")
const handlePageNoChange = (pageNo)=>{
    console.log(pageNo)
    props.dataSource.pageNo = pageNo;//分页跳转
    emit("loadData")
}
onMounted(()=>{
    console.log(props.dataSource)
})

</script>

<template>
        <!-- {{ props.dataSource }} -->

    <div v-for="(item,idx) in dataSource">
        <slot :data="item" :idx=idx+1></slot>
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
            :total="totalCount"
            :current-page.sync="dataSource.pageNo"
            layout="prev,pager,next"
            @current-change="handlePageNoChange"
            style="text-align: right;"
            
            >

        </el-pagination>
    </div>
</template>