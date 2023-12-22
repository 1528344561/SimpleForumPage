
<script setup>
import {ref}from'vue'
import {barListService}from '@/api/bar.js'
import {barFindByBarNameService} from '@/api/bar.js'
import {useRouter} from 'vue-router'
import {onMounted} from 'vue'
import {barGotoService} from '@/api/bar.js'
const bar = ref({
    barName:'',
    barIntroduction:'',
    barPic:'',
})
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
    console.log(bar.value)
    // console.log(bar.value)
    // alert(bar.value)
    // console.log(await barFindByBarNameService(bar.value.barName).message)
    // console.log(bar.value)
};

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
