<script>

</script>

<template>
    <div class="body">
        <div class="super-button super-center">
        <a href="#" >BUTTON</a>
        </div>
    </div>

</template>
<style lang="css">
/* .body{
    width: 100%;
    height: 100%;
    background-color: #000;
    margin: 0;
    padding: 0;
} */
.super-center{
    position: absolute;
    top: 50%;
    padding: 50%; 
    width: 200px;
    height: 60px;
    line-height: 60px;
}
.super-button a{

    left: 50%;
    transform: translate(-50%,50%);

    text-align: center;
    color: #fff;
    font-size: 24px;
    text-decoration: none;
    font-family: sans-serif;
    box-sizing: border-box;

    background: 
        linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
    background-size: 400%;

    border-radius: 30px;
    z-index: 1;

}
.super-button a:hover{
    animation: animate 8s linear infinite;
}
@keyframes animate {
    from{
        background-position:0%;
    }
    to{
        background-position:400%;
    }
}
.super-button a::before{
    content: '';
    position: absolute;
    inset: -5px;
    z-index: -1;
    background: 
        linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
    background-size: 400%;
    border-radius: 40px;
    opacity: 0;
}
.super-button a:hover::before{
    filter: blur(20px);
    opacity: 1;
    animation: animate 8s linear infinite;

}
</style>