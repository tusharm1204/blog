<template>   
        <!-- <SideBar> -->
        <router-view></router-view>
        <!-- <loader object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#000000" objectbg="#999793" opacity="100" name="box"></loader> -->

    <!-- </SideBar> -->
</template>

<script>
// import SideBar from '@/components/SideBar.vue'
export default {
    name: 'App',
    // components:{SideBar}
}
</script>


<style>
@import "@vueform/multiselect/themes/default.css";
</style>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

}

li {
    list-style-type: none;
}

li a {
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;

}

.router {
    display: flex;
    padding: 20px;
    justify-content: center;
    word-spacing: 15px;
}
</style>
