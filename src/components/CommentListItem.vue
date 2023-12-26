<script setup>
const props = defineProps({
    data:{
        type:Object
    },
    idx:{
        type:Number,
        default:1
    }
})

// console.log(data)
</script>
<template>
    <div class="comment-item">
        <div class="comment-item-inner">
            <div class="comment-body">
                
                <div class="user-info">
                    <router-link :to="'/user/'+data.createUser" style="text-decoration: none;">

                    <Avatar :userId="data.createUser" :width="50"></Avatar>
                    <div class="louzhu">
                            <!-- <img src="http://tb2.bdstatic.com/tb/static-user/widget/pb_author/images/louzhu_f37d453.png"> -->
                    </div>
                    <UserInfo :userId="data.createUser">

                    </UserInfo>
                    </router-link>

                </div>
                
                <div class="commentContent">
                    <!-- <iframe :src="data.commentContent"> -->
                        <div v-html="data.commentContent">

                        </div>

                    <!-- </iframe> -->
                    <!-- {{ data.commentContent }} -->
                </div>
                <div class="floor-info">
                    <div class="Floor-Number">
                        {{ idx }}楼
                    </div>
                    <div class="commentSendTime">
                            {{ data.createTime }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.comment-item{
    border: 0;
    border-left: 1px solid #E5E5E5;
    border-bottom: 1px solid #E1E4E6;
    .comment-item-inner{
        display: flex;
        flex-direction: column;
        .comment-body{
            display: flex;
            flex-direction: row;
            position: relative;

            // background-color: aqua;
                .commentContent{
                // position: relative;
                float: left;
                width: 588px;
                padding: 0 0 8px 20px;
                background: #fff;
                .user-info{
                    width: 200px;
                    // padding: 5px;
                    .louzhu{
                        width: 100%;
                        height: 100%;
                        background: url(http://tb2.bdstatic.com/tb/static-user/widget/pb_author/images/louzhu_f37d453.png) no-repeat -44px 0;
                    }
                }
            
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
                .commentSendTime{
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
