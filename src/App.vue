<!-- <script>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
//逻辑部分

// export default{
//     data(){
//       return {
//         msg:'Not Simple'
//       }
//     }
//   }

</script> -->
<script setup>
import LoginVue from '@/views/Login.vue'
import HomeVue from '@/views/home.vue'
import TestVue from '@/views/test.vue'
import router from '@/router/index.js'
</script>

<template>
  <!-- <LoginVue/> -->
  <!-- <HomeVue/> -->
  <!-- html-->
  <!-- <h1>SimpleForum</h1> -->
  <!-- <p></p> -->
  <!-- <div id="app"> -->
    <!-- <h2>{{ msg }}</h2> -->
  <!-- </div> -->


    <router-view></router-view>
  
</template>

<style scoped>
  /* 样式*/
  h1{
    color :cornflowerblue;
    font-weight: 800;
    font-size: 100px;
    font-family: Cambria;
}
</style>
