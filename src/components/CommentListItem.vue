<script setup>
const props = defineProps({
    data:{
        type:Object
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
                    <Avatar :userId="data.createUser" :width="50">
                            
                    </Avatar>
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
                <div class="commentSendTime">
                            {{ data.createTime }}
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
            // background-color: aqua;
                .commentContent{
                position: relative;
                float: left;
                width: 588px;
                padding: 0 0 8px 20px;
                background: #fff;
            }
            .commentSendTime{
                // position: ;
                // margin-bottom: 0px;
                // margin-right: 13px;
                display: inline-block;
                margin: 0 4px;
                color: #999;
                font-size: 12px;
                font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
            }
        }
    }
}

</style>
