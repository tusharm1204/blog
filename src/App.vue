<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',

    data() {
        return {

        }
    },
}
</script>

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
