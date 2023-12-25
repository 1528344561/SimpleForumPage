<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
const props = defineProps({
    data:{
        type:Object
    },
    idx:{
        type:Number,
        default:1
    }
})

const handleRowClick = async()=>{
    router.push('/p/'+props.data.data.postId)
    // alert(111)
}
// console.log(data)
</script>
<template>
    <!-- {{ props.data }} -->
    <div class="post-item">
        <div class="post-item-inner">
            <div class="post-body" @click="handleRowClick">
                

                
                <div class="postTitle">

                    <!-- 调了很久发现这里是props.data.data,不太理解 -->
                    {{ props.data.data.postTitle}}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.post-item{
    width: 690px;
    border-top: 1px dotted #E1E3E6;
    position: relative;
    padding-top: 15px;
    margin-bottom: 12px;
    .post-item-inner{
        display: flex;
        flex-direction: column;
        .post-body{
            display: flex;
            flex-direction: row;
            position: relative;

            // background-color: aqua;
                .postTitle{
                    font-size: 14px;
                    line-height: 14px;
                    color: #2962B6;
                    cursor: pointer;
                }
                .postContent{
                // position: relative;
                float: left;
                width: 588px;
                padding: 0 0 8px 20px;
                background: #fff;
            }
            .floor-info{
                display: inline-block;
                color: #999;
                font-size: 12px;
                font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
                display: flex;
                flex-direction: row;
                // margin: 0 4px;
                position: absolute;
                right: 0px;
                bottom: 0;
                width: 30%;
                // height: 20px;
                line-height: 20px;
                .postSendTime{
                    margin-left: 5px;
                    // width:50%;
                }
                .Floor-Number{
                    // margin-right: 5px;
                    // display: inline-block;
                    width: auto;
                }
            }
        }
    }
}

</style>
