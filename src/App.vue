<template>   
        <!-- <SideBar> -->
        <router-view></router-view>

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
