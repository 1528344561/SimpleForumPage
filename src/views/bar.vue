
<script setup>
import {ref}from'vue'
import {barListService}from '@/api/bar.js'
import {useRouter} from 'vue-router'

import {barGotoService} from '@/api/bar.js'
const bars = ref([

]);
// alert(this.$route.query)

const setup=() =>{
    const route = useRouter()
    const barName = ref('孙笑川');
    // barName.value = route.query.barName || '';
    // alert(barName)
    // return { productId, name }
}
setup()
</script>

<template>

    <div class="barInfo">
        <div class="barAvatar">
            <img src="../../file/孙笑川.png">
            
            <p id="barName">孙笑川吧</p>
        </div>
    </div>


</template>

<style lang="scss" scoped>
.barInfo{
    display: flex;
    flex-direction: column;
    display: grid;
    grid-template-columns: repeat(3, 1fr);  

}
.barName{
    font-weight: 10px;
}
</style>
