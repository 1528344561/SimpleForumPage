
<script setup>
import {ref}from'vue'
import {barListService}from '@/api/bar.js'
import {useRouter} from 'vue-router'

import {barGotoService} from '@/api/bar.js'
const bar = ref({
    barName:'孙笑川',
    barIntroduction:'',
    barAvatar:'http://localhost/file/孙笑川.png',
});
// alert(this.$route.query)

const setup=() =>{
}
setup()
</script>

<template>

    <div class="barInfo">
        <div class="barAvatar">
            <img :src="bar.barAvatar">

            <div class="barProfile">
            <span >{{ bar.barName }}</span>
        </div>
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
